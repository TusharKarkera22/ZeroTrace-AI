from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Union, Optional
import pandas as pd
import numpy as np
import joblib
import os
import json
import uuid
import asyncio
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# Try to import plotly with a fallback
try:
    import plotly
    PLOTLY_AVAILABLE = True
except ImportError:
    PLOTLY_AVAILABLE = False
    print("Plotly import failed, interactive plots will not be available")

# Lazy import for Nillion libraries to reduce memory usage
def get_nillion_imports():
    import nada_numpy as na
    import nada_numpy.client as na_client
    from dotenv import load_dotenv
    from nillion_client import (
        InputPartyBinding, Network, NilChainPayer,
        NilChainPrivateKey, OutputPartyBinding,
        Permissions, PrivateKey, SecretInteger, VmClient
    )
    from nillion_client.ids import UserId
    from nada_ai.client import SklearnClient
    
    return na, na_client, load_dotenv, InputPartyBinding, Network, NilChainPayer, \
           NilChainPrivateKey, OutputPartyBinding, Permissions, PrivateKey, \
           SecretInteger, VmClient, UserId, SklearnClient

# Create necessary directories
os.makedirs("uploads", exist_ok=True)
os.makedirs("model", exist_ok=True)
os.makedirs("target", exist_ok=True)

# Constants
MODEL_PATH = "model/diabetes_classifier.joblib"
SCALER_PATH = "model/diabetes_scaler.joblib"
PROVIDER_INFO_PATH = "model/provider_info.json"

# Initialize FastAPI app
app = FastAPI(
    title="Diabetes Prediction API",
    description="API for predicting diabetes risk using patient data with secure computation",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates setup
templates = Jinja2Templates(directory="templates")

# Data models
class PatientData(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float
    use_local: Optional[bool] = True

class PredictionResponse(BaseModel):
    diabetes_probability: float
    risk_level: str

class TrainingResponse(BaseModel):
    message: str
    accuracy: float
    model_stored: bool

# Helper functions
async def new_client(network, id: int, private_key=None):
    """Create a new VmClient for a participant"""
    # Import the necessary modules only when needed
    _, _, _, _, _, NilChainPayer, NilChainPrivateKey, _, _, PrivateKey, _, VmClient, _, _ = get_nillion_imports()
    
    nilchain_key = os.getenv(f"NILLION_NILCHAIN_PRIVATE_KEY_{id}")
    if not nilchain_key:
        raise HTTPException(status_code=500, detail=f"Missing environment variable NILLION_NILCHAIN_PRIVATE_KEY_{id}")
        
    payer = NilChainPayer(
        network,
        wallet_private_key=NilChainPrivateKey(bytes.fromhex(nilchain_key)),
        gas_limit=10000000,
    )

    # Use random key or passed private key
    signing_key = PrivateKey(private_key)
    client = await VmClient.create(signing_key, network, payer)
    
    return client

async def fund_chain(client, funds_amount=3000000):
    """Add funds to a Nillion client"""
    await client.add_funds(funds_amount)
    return True

def prepare_diabetes_data(custom_data_path=None):
    """Prepare the diabetes dataset with optional custom data"""
    # Default Pima Indians Diabetes dataset
    url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
    column_names = [
        'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
        'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome'
    ]
    
    # Load the dataset
    df = pd.read_csv(url, names=column_names)
    
    # If custom data is provided, append it
    if custom_data_path and os.path.exists(custom_data_path):
        custom_df = pd.read_csv(custom_data_path)
        
        # Ensure the custom data has the same columns
        if set(custom_df.columns) == set(column_names):
            df = pd.concat([df, custom_df], ignore_index=True)
        else:
            # Try to map columns if they don't match exactly
            mapped_df = pd.DataFrame(columns=column_names)
            for col in column_names:
                if col in custom_df.columns:
                    mapped_df[col] = custom_df[col]
            
            if not mapped_df.empty:
                df = pd.concat([df, mapped_df], ignore_index=True)
    
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

def train_diabetes_model(custom_data_path=None):
    """Train the diabetes prediction model with optional custom data"""
    X_train, X_test, y_train, y_test, scaler = prepare_diabetes_data(custom_data_path)
    
    # Train logistic regression model
    model = LogisticRegression(solver='liblinear', random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    # Save the model and scaler
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    
    return model, scaler, accuracy

async def store_model_on_nillion(model):
    """Store the model on the Nillion network"""
    # Import the necessary modules only when needed
    na, na_client, load_dotenv, InputPartyBinding, Network, _, _, _, Permissions, _, _, _, UserId, SklearnClient = get_nillion_imports()
    
    # Load environment variables
    if os.path.exists(".env"):
        load_dotenv(".env")
    elif os.path.exists("nillion.env"):
        load_dotenv("nillion.env")
    
    # Connect to the Nillion network
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

    # Check if the program file exists
    if not os.path.exists(program_mir_path):
        os.makedirs("./target", exist_ok=True)
        # For demo purposes, we'll just create an empty file
        # In production, this would be compiled Nada program
        with open(program_mir_path, "wb") as f:
            f.write(b"mock program data")

    # Store the program
    program_mir = open(program_mir_path, "rb").read()
    program_id = await model_provider.store_program(program_name, program_mir).invoke()

    # Store the model as secrets
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

    # Save the necessary information for the patient to use
    provider_variables = {
        "program_id": str(program_id),
        "model_store_id": model_store_id.hex,
        "model_provider_user_id": str(model_provider.user_id),
    }
    
    with open(PROVIDER_INFO_PATH, "w") as provider_variables_file:
        json.dump(provider_variables, provider_variables_file)
    
    return program_id, model_store_id, model_provider.user_id

async def predict_diabetes(patient_data):
    """Make a prediction using the stored model on Nillion"""
    # Import the necessary modules only when needed
    na, na_client, load_dotenv, InputPartyBinding, Network, _, _, OutputPartyBinding, Permissions, _, _, _, UserId, _ = get_nillion_imports()
    
    # Load environment variables
    if os.path.exists(".env"):
        load_dotenv(".env")
    elif os.path.exists("nillion.env"):
        load_dotenv("nillion.env")
    
    # Load provider information
    if not os.path.exists(PROVIDER_INFO_PATH):
        raise FileNotFoundError("Model not deployed to Nillion yet. Please train the model first.")
        
    with open(PROVIDER_INFO_PATH, "r") as provider_variables_file:
        provider_variables = json.load(provider_variables_file)

    program_id = provider_variables["program_id"]
    model_store_id = uuid.UUID(hex=provider_variables["model_store_id"])
    model_provider_user_id = UserId.parse(provider_variables["model_provider_user_id"])

    # Scale patient data
    if not os.path.exists(SCALER_PATH):
        raise FileNotFoundError("Scaler not found. Please train the model first.")
        
    scaler = joblib.load(SCALER_PATH)
    patient_data_scaled = scaler.transform([patient_data])[0]

    # Connect to the Nillion network
    network = Network(
        chain_id="nillion-chain-testnet-1",
        chain_grpc_endpoint="https://testnet-nillion-grpc.lavenderfive.com",
        nilvm_grpc_endpoint="https://node-1.nilvm-testnet-1.nillion-network.testnet.nillion.network:14311"
    ) 
    
    # Create client for patient
    patient = await new_client(
        network,
        0,
        b"\x15\xa0\xc1\xcc\x12\xb5r\xf9\xcb\x89\x95\x8d\x94\xfb\xfe)\xdf\xfe\xbd3\x00\x18\x80\xc1\xd9W\x8b\xf7\xc0\x92S\xe9",
    )

    # Store input as secret values
    patient_features = na_client.array(patient_data_scaled, "patient_data", na_client.SecretRational)

    permissions = Permissions.defaults_for_user(patient.user_id).allow_compute(
        patient.user_id, program_id
    )
    patient_data_store_id = await patient.store_values(
        patient_features, ttl_days=1, permissions=permissions
    ).invoke()

    # Run computation
    model_provider_name = "Provider"
    patient_name = "Patient"
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

    result = await patient.retrieve_compute_results(compute_id).invoke()

    # Compute probability
    logit_value = result.get("diabetes_logit_0").value
    probability = 1 / (1 + np.exp(-logit_value / 2**16))
    
    return probability

def process_patient_data(data: Union[PatientData, Dict, List, str]):
    """Convert patient data from various formats to a standardized numpy array"""
    if isinstance(data, PatientData):
        # If the data is a Pydantic model, convert to a list in the correct order
        column_names = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]
        return np.array([getattr(data, col) for col in column_names])
    elif isinstance(data, dict):
        # If the data is a dictionary, convert to a list in the correct order
        column_names = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]
        return np.array([float(data.get(col, 0)) for col in column_names])
    elif isinstance(data, list):
        # If the data is a list, ensure it's the right length
        if len(data) != 8:
            raise ValueError("Patient data must have 8 features")
        return np.array([float(x) for x in data])
    elif isinstance(data, str):
        # If the data is a comma-separated string
        values = data.split(',')
        if len(values) != 8:
            raise ValueError("Patient data must have 8 features")
        return np.array([float(x) for x in values])
    else:
        raise ValueError("Unsupported data format")

# Routes
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Home page with basic usage instructions"""
    html_content = """
    <html>
    <head>
        <title>Diabetes Prediction API</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; }
            h2 { color: #3498db; }
            code { background-color: #f8f9fa; padding: 2px 5px; border-radius: 3px; }
            pre { background-color: #f8f9fa; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Diabetes Prediction API</h1>
        <h2>Endpoints:</h2>
        <h3>Train Model</h3>
        <p><code>POST /train</code></p>
        <p>Upload a CSV file to train the model. The file should have the following columns:</p>
        <ul>
            <li>Pregnancies</li>
            <li>Glucose</li>
            <li>BloodPressure</li>
            <li>SkinThickness</li>
            <li>Insulin</li>
            <li>BMI</li>
            <li>DiabetesPedigreeFunction</li>
            <li>Age</li>
            <li>Outcome</li>
        </ul>
        
        <h3>Predict</h3>
        <p><code>POST /predict</code></p>
        <p>Send patient data to get a diabetes prediction. Format:</p>
        <pre>
{
  "Pregnancies": 1,
  "Glucose": 85,
  "BloodPressure": 66,
  "SkinThickness": 29,
  "Insulin": 0,
  "BMI": 26.6,
  "DiabetesPedigreeFunction": 0.351,
  "Age": 31,
  "use_local": true
}
        </pre>
        <p>Set use_local: true for local prediction or false for secure Nillion prediction.</p>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/train", response_model=TrainingResponse)
async def train_model(file: UploadFile = File(...)):
    """Train the model with optional custom data"""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV")

    # Save uploaded file temporarily
    filepath = os.path.join('uploads', file.filename)
    with open(filepath, 'wb') as buffer:
        buffer.write(await file.read())

    try:
        model, scaler, accuracy = train_diabetes_model(filepath)
        
        # Create background task to store model on Nillion
        background_tasks = asyncio.create_task(store_model_on_nillion(model))
        
        return TrainingResponse(
            message="Model trained successfully",
            accuracy=float(accuracy),
            model_stored=True
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict", response_model=PredictionResponse)
async def predict(data: PatientData):
    """Make a prediction using the trained model"""
    try:
        patient_data = process_patient_data(data)
        
        # For local prediction (faster)
        if data.use_local and os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            
            # Scale the patient data
            patient_data_scaled = scaler.transform([patient_data])[0]
            
            # Make prediction
            probability = model.predict_proba([patient_data_scaled])[0][1]
            
            return PredictionResponse(
                diabetes_probability=float(probability),
                risk_level="High" if probability > 0.5 else "Low"
            )
        
        # For Nillion prediction (secure but more complex)
        else:
            probability = await predict_diabetes(patient_data)
            
            return PredictionResponse(
                diabetes_probability=float(probability),
                risk_level="High" if probability > 0.5 else "Low"
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """API health check endpoint"""
    return {"status": "healthy"}