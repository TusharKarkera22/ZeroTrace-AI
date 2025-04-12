"""
Diabetes prediction using logistic regression in Nada.
This program enables private inference where:
- One party provides a trained logistic regression model
- Another party provides patient data
- The prediction is computed securely without revealing sensitive data
"""

import nada_numpy as na
from nada_dsl import Party
from nada_ai.linear_model import LogisticRegression


def nada_main():
    # Define the parties involved
    model_provider = Party(name="Provider")  # Provider of the trained model
    patient = Party(name="Patient")         # User with medical data
    
    # Instantiate logistic regression for diabetes prediction
    # Our model will have DIM input features and 1 output (binary classification)
    diabetes_model = LogisticRegression(8, 1)
    
    # Load model weights from Nillion network
    # The model was previously stored with the ID "diabetes_model"
    diabetes_model.load_state_from_network("diabetes_model", model_provider, na.SecretRational)
    
    # Load patient's medical data (features)
    # This data is provided by the Patient at computation time
    patient_data = na.array((8,), patient, "patient_data", na.SecretRational)
    
    # Compute diabetes prediction
    result = diabetes_model.forward(patient_data)
    
    # Output the prediction score to the patient
    # Higher positive values indicate higher likelihood of diabetes
    return result.output(patient, "diabetes_logit")