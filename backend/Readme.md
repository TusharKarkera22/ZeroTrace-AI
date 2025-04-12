# 🩺 Diabetes Prediction Application with Nillion Integration

This application provides diabetes prediction functionality using machine learning models. It supports secure computation powered by **Nillion**, ensuring patient data privacy during model inference and training.

---

## 📁 Project Structure

The project is organized into **frontend** and **backend** components:

### 🔙 Backend
- `model/`: Contains trained models and model-related files
- `src/`: Core Python application logic (APIs, utilities, services)
- `target/`: Build outputs and package artifacts
- Root Python files:
  - `app.py`: Main application entrypoint
  - `preprocess_data.py`: Data cleaning and preprocessing
  - `train_model.py`: Training the ML model
  - `local_inference.py`: For local predictions
  - `run_inference.py`: Inference via app interface
  - `nillion_inference.py`: Nillion-powered secure inference

### 🖼️ Frontend
- UI components to interact with the prediction model (React or other JS framework)
- Forms for data input and prediction display
- Integration with backend API

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TusharKarkera22/ZeroTrace-AI
   cd diabetes-predictor
   ```

2. **Create a virtual environment** (optional but recommended)

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install required dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Install Nillion SDK**

   Follow the official Nillion installation docs: https://docs.nillion.com

   Example (pseudo command):

   ```bash
   pip install nillion-sdk
   ```

---

## ▶️ Usage

### 🔧 Data Preprocessing
Preprocess raw data from diabetes.csv and patient.csv:

```bash
python preprocess_data.py
```

### 🏋️ Model Training
Train the diabetes prediction model:

```bash
python train_model.py
```
This will output a model file under the model/ directory.

### 🔍 Making Predictions

#### ✅ Local Inference (no privacy-preserving computation):
```bash
python local_inference.py
```

#### 🔐 Nillion-Powered Secure Inference
Use this for privacy-preserving computation with Nillion:

```bash
python nillion_inference.py
```
Make sure you're connected to the Nillion network and have configured the appropriate keys and endpoints.

#### 🌐 Web Inference (via frontend):
Start the app:

```bash
python app.py
```

Then open your browser and navigate to:
http://localhost:5000

Use the UI to upload or enter patient data and view prediction results.

---

## 🛡️ Nillion Integration

### Why Nillion?
- 🧠 Perform ML computations without exposing raw patient data
- 🔐 Ensures HIPAA/GDPR compliance through secure multi-party computation (SMPC)

### Nillion Setup (Example)
```python
from nillion.client import NillionClient

Use your testnet wallet private key credentials to connect to the Nillion network:
```


---

## 📚 References
- [Nillion Official Docs](https://docs.nillion.com)
- [Pima Indians Diabetes Dataset](https://www.kaggle.com/uciml/pima-indians-diabetes-database)
- [scikit-learn Documentation](https://scikit-learn.org/stable/documentation.html)
