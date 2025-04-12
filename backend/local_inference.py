"""Run diabetes prediction locally using the saved model file"""

import argparse
import joblib
import numpy as np
import pandas as pd

# Parse command line arguments
parser = argparse.ArgumentParser()
parser.add_argument(
    "--model-path",
    dest="model_path",
    type=str,
    required=True,
    help="Path to the saved model file (.joblib)"
)
parser.add_argument(
    "--data-path",
    dest="data_path",
    type=str,
    required=True,
    help="Path to the patient data (CSV file or single values)"
)
args = parser.parse_args()

def local_inference(model_path, data_path):
    """Run inference using the locally saved model"""
    print(f"Loading model from {model_path}...")
    
    # Load the model package
    model_package = joblib.load(model_path)
    model = model_package['model']
    scaler = model_package['scaler']
    
    print("Model loaded successfully.")
    
    # Load patient data
    if data_path.endswith('.csv'):
        # Load from CSV
        df = pd.read_csv(data_path)
        
        # Check if this is a row of features or missing any data
        if len(df.shape) == 1 or df.shape[0] == 1:
            # Make sure we have all required features
            required_features = [
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ]
            
            # Drop outcome if present
            if 'Outcome' in df.columns:
                df = df.drop('Outcome', axis=1)
            
            # Use only required features in correct order if they exist
            missing_features = [f for f in required_features if f not in df.columns]
            if missing_features:
                print(f"Warning: Missing features: {missing_features}")
            
            # Use whatever features we have
            features = df.values
        else:
            # Multiple patients - use first row
            print("Multiple patients found, using only the first row")
            if 'Outcome' in df.columns:
                features = df.drop('Outcome', axis=1).iloc[0].values.reshape(1, -1)
            else:
                features = df.iloc[0].values.reshape(1, -1)
    else:
        # Parse manual input (comma-separated values)
        try:
            values = list(map(float, data_path.split(',')))
            expected_feature_count = 8  # For diabetes dataset
            
            if len(values) != expected_feature_count:
                print(f"Warning: Expected {expected_feature_count} features, but got {len(values)}")
            
            features = np.array(values).reshape(1, -1)
        except ValueError:
            raise ValueError("If not providing a CSV file, please provide comma-separated numeric values")
    
    print(f"Raw features: {features}")
    
    # Apply standardization using the scaler
    features_scaled = scaler.transform(features)
    print(f"Scaled features: {features_scaled}")
    
    # Make prediction
    # Get both probability and raw prediction
    prediction_proba = model.predict_proba(features_scaled)
    prediction = model.predict(features_scaled)
    
    # Extract logit value (log-odds)
    # For logistic regression: logit = log(p/(1-p))
    # We can extract this from coef_ and intercept_
    logit = model.decision_function(features_scaled)[0]
    
    print("\n----- RESULTS -----")
    print(f"Raw logit value: {logit:.6f}")
    print(f"Probability of diabetes (class 1): {prediction_proba[0][1]:.6f}")
    print(f"Prediction: {'Diabetic' if prediction[0] == 1 else 'Non-diabetic'}")
    print(f"Raw prediction: {prediction[0]}")
    
    # Compare with manual calculation of probability from logit
    manual_prob = 1 / (1 + np.exp(-logit))
    print(f"Manually calculated probability: {manual_prob:.6f}")
    
    # Print model coefficients for reference
    print("\n----- MODEL INFO -----")
    print(f"Coefficients: {model.coef_}")
    print(f"Intercept: {model.intercept_}")
    
    return {
        'features': features,
        'scaled_features': features_scaled,
        'logit': logit,
        'probability': prediction_proba[0][1],
        'prediction': prediction[0]
    }

if __name__ == "__main__":
    local_inference(args.model_path, args.data_path)