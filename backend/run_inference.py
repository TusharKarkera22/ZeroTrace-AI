import argparse
import asyncio
import json
import os
import uuid

import joblib
import numpy as np
import pandas as pd

import nada_numpy as na
import nada_numpy.client as na_client
from dotenv import load_dotenv
from nillion_client import (InputPartyBinding, Network, NilChainPayer,
                           NilChainPrivateKey, OutputPartyBinding,
                           Permissions, PrivateKey, SecretInteger, VmClient)
from nillion_client.ids import UserId

home = os.getenv("HOME")
load_dotenv("nillion.env")

PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--patient-data",
    dest="patient_data",
    type=str,
    help="CSV file with patient data or comma-separated values",
    required=True,
)
PARSER.add_argument(
    "--in-path",
    dest="in_path",
    type=str,
    required=True,
)
ARGS = PARSER.parse_args()

async def fund_chain(client, funds_amount=3000000):
    """Add funds to a Nillion client"""
    print(f"💰  Adding {funds_amount} uNIL to client balance...")
    await client.add_funds(funds_amount)
    print("✅ Funds added!")


async def new_client(network, id: int, private_key: bytes = None):
    """Create a new VmClient for a participant"""
    nilchain_key: str = os.getenv(f"NILLION_NILCHAIN_PRIVATE_KEY_{id}")  # Load private key for payment
    payer = NilChainPayer(
        network,
        wallet_private_key=NilChainPrivateKey(bytes.fromhex(nilchain_key)),
        gas_limit=10000000,
    )

    # Use random key or passed private key
    signing_key = PrivateKey(private_key)
    client = await VmClient.create(signing_key, network, payer)
  # Fund the client before use
    return client


def load_patient_data(patient_data_input):
    """Load patient data from file or parse from command line"""
    if os.path.exists(patient_data_input):
        if patient_data_input.endswith('.csv'):
            df = pd.read_csv(patient_data_input)
            if len(df) > 0:
                return df.iloc[0].values  # Return first row
        else:
            return np.load(patient_data_input)
    else:
        try:
            return np.array([float(x) for x in patient_data_input.split(',')])
        except ValueError:
            raise ValueError("Patient data must be a valid CSV file or comma-separated values")

async def main(patient_data_input: str, in_path: str) -> None:
    network = Network.from_config("devnet")

    network = Network(
        chain_id="nillion-chain-testnet-1",
        chain_grpc_endpoint="https://testnet-nillion-grpc.lavenderfive.com",
        nilvm_grpc_endpoint="https://node-1.nilvm-testnet-1.nillion-network.testnet.nillion.network:14311"
    ) 

    model_provider_name = "Provider"
    model_provider = await new_client(
        network,
        0,
        b'\xbf\xdf7\xa9\x1eL\x10i"\xd8\x1f\xbb\xe8\r;\x1b`\x1a\xd1\xa1;\xef\xd8\xbbf|\xf9\x12\xe9\xef\x03\xc7',
    )
    patient_name = "Patient"
    patient = await new_client(
        network,
        0,
        b"\x15\xa0\xc1\xcc\x12\xb5r\xf9\xcb\x89\x95\x8d\x94\xfb\xfe)\xdf\xfe\xbd3\x00\x18\x80\xc1\xd9W\x8b\xf7\xc0\x92S\xe9",
    )

    # 💸 Fund both clients
   

    # 📥 Load model identifiers
    with open(in_path, "r") as provider_variables_file:
        provider_variables = json.load(provider_variables_file)

    program_id = provider_variables["program_id"]
    model_store_id = uuid.UUID(hex=provider_variables["model_store_id"])
    model_provider_user_id = UserId.parse(provider_variables["model_provider_user_id"])

    # 🔄 Load patient data and scale
    patient_data = load_patient_data(patient_data_input)
    scaler = joblib.load("model/diabetes_scaler.joblib")
    patient_data_scaled = scaler.transform([patient_data])[0]
    print(f"🩺 Patient input (scaled): {patient_data_scaled}")

    # 🔐 Store input as secret values
    print("🔐 Storing patient data as secret values...")
    patient_features = na_client.array(patient_data_scaled, "patient_data", na_client.SecretRational)

    permissions = Permissions.defaults_for_user(patient.user_id).allow_compute(
        patient.user_id, program_id
    )
    patient_data_store_id = await patient.store_values(
        patient_features, ttl_days=1, permissions=permissions
    ).invoke()
    print(f"✅ Patient data stored: {patient_data_store_id}")

    # 🚀 Run computation
    print("🚀 Running computation on program", program_id)
    input_bindings = [
        InputPartyBinding(model_provider_name, model_provider_user_id),
        InputPartyBinding(patient_name, patient.user_id),
    ]
    output_bindings = [OutputPartyBinding(patient_name, [patient.user_id])]

    compute_id = await patient.compute(
        program_id,
        input_bindings,
        output_bindings,
        values={},
        value_ids=[model_store_id, patient_data_store_id],
    ).invoke()

    print(f"⏳ Waiting for compute_id {compute_id} to complete...")
    result = await patient.retrieve_compute_results(compute_id).invoke()
    print(f"✅ Inference result for compute_id {compute_id}")
    print(f"📦 Raw result: {result}")

    # 📊 Compute probability
    logit_value = result.get("diabetes_logit_0").value
    probability = 1 / (1 + np.exp(-logit_value / 2**16))
    print(f"📊 Diabetes probability: {probability:.4f} ({probability*100:.2f}%)")

    if probability > 0.5:
        print("⚠️ High diabetes risk detected. Please consult a doctor.")
    else:
        print("✅ Low diabetes risk predicted. Still, consult a professional if unsure.")

    return result

if __name__ == "__main__":
    asyncio.run(main(ARGS.patient_data, ARGS.in_path))
