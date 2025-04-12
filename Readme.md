
# 🛡️ ZeroTrace-AI: Privacy-Preserving Diabetes Prediction System

## 🔍 Problem Statement

Healthcare organizations need accurate diabetes risk prediction tools, but traditional ML systems compromise patient data privacy:

- Patient health data is highly sensitive and protected by regulations (HIPAA, GDPR)
- Conventional ML approaches require raw data access for training and inference
- Current solutions often fail to protect data throughout the entire ML lifecycle
- Healthcare providers need accurate predictions without exposing sensitive patient metrics

## 💡 Our Solution

ZeroTrace-AI is a **secure machine learning system** for predicting diabetes risk that protects sensitive patient data at all times.

- Unlike traditional systems where data might be shared or centralized, this solution uses Nillion's decentralized computation platform to ensure that patient information, such as Glucose, BMI, or Age, remains encrypted and private during both model training and predictions.
- The solution is a **privacy-preserving diabetes prediction system** built on Nillion's non-blockchain, non-MPC (multi-party computation) decentralized network. It leverages Nillion's unique architecture to process encrypted data for machine learning tasks, ensuring zero data leakage.
- The prototype is a working proof-of-concept that demonstrates the core functionality of the diabetes prediction system using Nillion's testnet. It includes a backend, frontend, and privacy features, tailored for healthcare providers.

## ✨ Key Features

- **End-to-End Privacy**: Patient data remains encrypted throughout the entire workflow
- **Secure ML Pipeline**: Both training and inference happen on encrypted data
- **User-Friendly Interface**: Easy-to-use frontend for healthcare professionals
- **High Accuracy**: Maintains prediction accuracy while preserving privacy
- **Regulatory Compliance**: Designed with HIPAA and GDPR requirements in mind
- **Scalable Architecture**: Built to handle growing datasets and user bases

## 🔒 Zero Trace AI's Approach

Our approach uses Nillion's cryptographic protocols to ensure that sensitive patient metrics never need to be decrypted for processing:

1. **Secure Data Storage**: Patient data is encrypted and stored using Nillion's SecretVault
2. **Privacy-Preserving Training**: ML models are trained on encrypted data
3. **Secure Inference**: Predictions are made without decrypting sensitive information
4. **Zero Knowledge Results**: Only authorized users receive prediction results

## 🧰 Technology Stack

### Backend
- Python with scikit-learn for ML models
- Flask/FastAPI for backend services
- Nillion SDK for secure computation
- Nada Ai

### Frontend
- Next.js for the React framework
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API communication

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- Nillion SDK (installation instructions below)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TusharKarkera22/ZeroTrace-AI.git
   cd ZeroTrace-AI
   ```

2. Install Nillion SDK:
   ```bash
   pip install nillion-sdk
   ```

3. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

4. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## 📊 Demo

The application allows healthcare providers to:

1. Securely input patient metrics (glucose levels, BMI, age, etc.)
2. Receive diabetes risk predictions without exposing data
3. Visualize prediction results and confidence scores
4. Manage patient records securely

## 📚 Documentation

For more information about the Nillion platform used in this project:

- [What Is Nillion](https://docs.nillion.com/what-is-nillion)
- [SecretVault Documentation](https://docs.nillion.com/build/secret-vault)
- [Nada Language Guide](https://docs.nillion.com/nada-lang)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Nillion for providing the privacy-preserving computation platform
- The diabetes research community for model validation datasets
- All contributors who have helped shape this project
