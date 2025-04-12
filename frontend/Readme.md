# Healthcare Secure ML Platform

This is a Next.js application that enables privacy-preserving machine learning for healthcare data while preserving patient privacy through advanced cryptographic technology.

## Features

- **Zero-Knowledge ML Training**: Machine learning models are trained on encrypted data using secure computation technology.
- **Data Privacy Verification**: Visual tools to help users understand and verify how their data is protected.
- **Secure Data Contribution**: Encrypted upload process that prevents exposure of sensitive healthcare information.
- **Model Status Monitoring**: Track the progress of secure ML training jobs.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Visualization**: Chart.js, D3.js
- **ML Security**: Secure computation with zero-knowledge proofs

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your environment variables:
   ```
   DEMO_API_URL=http://localhost:3000/api
   DEMO_API_KEY=demo_api_key_for_simulation
   ```

### Development

Run the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to view the application.

## How It Works

1. **Secure Encryption**: Patient data is encrypted before leaving the user's device, ensuring privacy from the start.
2. **Secure Distribution**: The encrypted data is split and distributed across a secure computation network, where no single node has access to the complete data.
3. **Privacy-Preserving ML**: Machine learning models are trained on encrypted data using secure multi-party computation and homomorphic encryption.
4. **Verifiable Processing**: Each step of the computation can be verified using zero-knowledge proofs, ensuring the integrity of the process without revealing the data.

## Privacy Guarantees

- **Mathematical Privacy**: Based on proven cryptographic techniques, not just policy promises
- **Zero Data Exposure**: Raw data is never exposed at any point in the computation process
- **Distributed Security**: Computation is split across multiple nodes for enhanced security
- **Audit Trail**: Every operation is logged and cryptographically verified

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 