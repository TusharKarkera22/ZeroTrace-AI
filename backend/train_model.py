"""Provide diabetes model weights to program"""

import argparse
import asyncio
import json
import os

import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

import nada_numpy as na
import nada_numpy.client as na_client
from dotenv import load_dotenv
from nillion_client import (InputPartyBinding, Network, NilChainPayer,
                          NilChainPrivateKey, OutputPartyBinding,
                          Permissions, PrivateKey, SecretInteger, VmClient)

from nada_ai.client import SklearnClient

PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--out-path",
    dest="out_path",
    type=str,
    required=True,
)
ARGS = PARSER.parse_args()

home = os.getenv("HOME")
load_dotenv("nillion.env")

# Function to download and prepare the diabetes dataset
def prepare_diabetes_data():
    # Using the Pima Indians Diabetes dataset
    url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
    column_names = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
                   'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome']
    
    # Load the dataset
    df = pd.read_csv(url, names=column_names)
    
    # Split features and target
    X = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    return X_train, X_test, y_train, y_test, scaler

# Function to train and evaluate the diabetes model
def train_diabetes_model():
    X_train, X_test, y_train, y_test, scaler = prepare_diabetes_data()
    
    # Train logistic regression model
    model = LogisticRegression(solver='liblinear', random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model accuracy: {accuracy:.4f}")
    
    # Save the model and scaler
    if not os.path.exists("model"):
        os.makedirs("model")
    joblib.dump(model, "model/diabetes_classifier.joblib")
    joblib.dump(scaler, "model/diabetes_scaler.joblib")
    
    return model, scaler

async def new_client(network, id: int, private_key: str = None):
    # Create payments config and set up Nillion wallet with a private key to pay for operations
    nilchain_key: str = os.getenv(f"NILLION_NILCHAIN_PRIVATE_KEY_{id}")  # type: ignore
    payer = NilChainPayer(
        network,
        wallet_private_key=NilChainPrivateKey(bytes.fromhex(nilchain_key)),
        gas_limit=10000000,
    )

    # Use a random key to identify ourselves
    signing_key = PrivateKey(private_key)
    print(signing_key.private_key)
    client = await VmClient.create(signing_key, network, payer)
    return client

async def main(out_path: str):
    # Train the diabetes prediction model
    model, scaler = train_diabetes_model()
    print("Diabetes prediction model trained successfully.")
    
    # Connect to the Nillion network
    network = Network.from_config("devnet")
    network = Network(
        chain_id="nillion-chain-testnet-1",
        chain_grpc_endpoint="https://testnet-nillion-grpc.lavenderfive.com",
        nilvm_grpc_endpoint="https://node-1.nilvm-testnet-1.nillion-network.testnet.nillion.network:14311"
    ) 

    # Create clients for model provider and patient
    model_provider = await new_client(
        network,
        0,
        b'\xbf\xdf7\xa9\x1eL\x10i"\xd8\x1f\xbb\xe8\r;\x1b`\x1a\xd1\xa1;\xef\xd8\xbbf|\xf9\x12\xe9\xef\x03\xc7',
    )
    patient = await new_client(
        network,
        0,
        b"\x15\xa0\xc1\xcc\x12\xb5r\xf9\xcb\x89\x95\x8d\x94\xfb\xfe)\xdf\xfe\xbd3\x00\x18\x80\xc1\xd9W\x8b\xf7\xc0\x92S\xe9",
    )
    
    program_name = "diabetes_prediction"
    program_mir_path = f"./target/{program_name}.nada.bin"

    # Store the program
    print("-----STORE PROGRAM")
    program_mir = open(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), program_mir_path), "rb"
    ).read()
    program_id = await model_provider.store_program(program_name, program_mir).invoke()
    print(f"Stored program_id: {program_id}")

    # Store the model as secrets
    print("-----STORE SECRETS (MODEL)")
    model_client = SklearnClient(model)
    model_secrets = model_client.export_state_as_secrets(
        "diabetes_model", na_client.SecretRational
    )
    
    # Create permissions for the patient to use the model
    permissions = Permissions.defaults_for_user(model_provider.user_id).allow_compute(
        patient.user_id, program_id
    )

    # Store the model on the Nillion network
    model_store_id = await model_provider.store_values(
        model_secrets, ttl_days=1, permissions=permissions
    ).invoke()

    print(f"Stored program with id: {program_id}")
    print(f"Stored model with id: {model_store_id}")
    print(f"Stored model_provider_user_id with id: {model_provider.user_id}")

    # Save the necessary information for the patient to use
    with open(out_path, "w") as provider_variables_file:
        provider_variables = {
            "program_id": str(program_id),
            "model_store_id": model_store_id.hex,
            "model_provider_user_id": str(model_provider.user_id),
        }
        json.dump(provider_variables, provider_variables_file)
    
    print(f"Provider information saved to {out_path}")

if __name__ == "__main__":
    asyncio.run(main(ARGS.out_path))