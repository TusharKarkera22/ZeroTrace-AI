"""Preprocess diabetes data for Nada AI inference"""

import argparse
import numpy as np
import pandas as pd
import json
from sklearn.preprocessing import StandardScaler

# Parse command line arguments
PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--data-path",
    dest="data_path",
    type=str,
    required=True,
    help="Path to the raw diabetes patient data"
)
PARSER.add_argument(
    "--provider-info-path",
    dest="provider_info_path",
    type=str,
    required=True,
    help="Path to the provider variables JSON file"
)
PARSER.add_argument(
    "--output-path",
    dest="output_path",
    type=str,
    required=True,
    help="Path to save processed features"
)
ARGS = PARSER.parse_args()

def preprocess_data(data_path, provider_info_path, output_path):
    """Preprocess patient data for Nada AI inference"""
    print("Loading patient data...")
    
    # Load provider info to get scaler parameters
    with open(provider_info_path, 'r') as f:
        provider_info = json.load(f)
    
    scaler_mean = np.array(provider_info["scaler_params"]["mean"])
    scaler_scale = np.array(provider_info["scaler_params"]["scale"])
    
    # Print scaler parameters for verification
    print("Using scaler mean values:")
    print(scaler_mean)
    print("Using scaler scale values:")
    print(scaler_scale)
    
    # Load patient data
    if data_path.endswith('.csv'):
        df = pd.read_csv(data_path)
        # Check if this is a single patient or multiple patients
        if len(df.shape) == 1 or df.shape[0] == 1:
            # Single patient - ensure we have all required features
            required_features = [
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ]
            
            # Check for column names that might be abbreviated
            rename_mapping = {
                'BloodPres': 'BloodPressure',
                'SkinThickn': 'SkinThickness',
                'DiabetesPr': 'DiabetesPedigreeFunction'
            }
            
            df = df.rename(columns=rename_mapping)
            
            # Verify all required features are present
            missing_features = [f for f in required_features if f not in df.columns]
            if missing_features:
                raise ValueError(f"Missing required features: {missing_features}")
            
            # Drop any target column if present
            if 'Outcome' in df.columns:
                df = df.drop('Outcome', axis=1)
            
            # Ensure features are in the correct order
            df = df[required_features]
            
            # Print raw features for verification
            print("Raw patient features:")
            print(df.values)
        else:
            # Multiple patients - keep only the first one
            print("Multiple patients found, using only the first patient")
            if 'Outcome' in df.columns:
                df = df.drop('Outcome', axis=1).iloc[0:1]
            else:
                df = df.iloc[0:1]
    
    # Convert to numpy array
    features = df.values
    if len(features.shape) == 1:
        features = features.reshape(1, -1)
    
    print(f"Feature shape before scaling: {features.shape}")
    
    # Apply standardization using the provided scaler parameters
    features_scaled = (features - scaler_mean) / scaler_scale
    
    print(f"Feature shape after scaling: {features_scaled.shape}")
    print(f"First few values: {features_scaled.flatten()[:3]}")
    
    # Manual logit calculation (if model coefficients are available)
    if "model_coefficients" in provider_info and "model_intercept" in provider_info:
        coefficients = np.array(provider_info["model_coefficients"])
        intercept = provider_info["model_intercept"]
        logit = np.dot(features_scaled, coefficients.T) + intercept
        probability = 1 / (1 + np.exp(-logit))
        
        print(f"Locally computed logit: {logit[0][0]}")
        print(f"Locally computed probability: {probability[0][0]}")
        
        scale_factor = provider_info.get("scale_factor", 2**20)
        scaled_logit = int(logit[0][0] * scale_factor)
        print(f"Locally computed scaled logit (fixed-point): {scaled_logit}")
    
    # Save processed features
    np.save(output_path, features_scaled)
    print(f"Preprocessed features saved to {output_path}")
    
    return features_scaled

if __name__ == "__main__":
    preprocess_data(ARGS.data_path, ARGS.provider_info_path, ARGS.output_path)