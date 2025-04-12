# Frontend - Diabetes Prediction Application

This frontend application is built using Next.js, Tailwind CSS, Framer Motion, and Axios to provide an intuitive interface for the Diabetes Prediction Application.

## 🛠️ Technologies Used

- **Next.js**: React framework for production-grade applications
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Axios**: Promise-based HTTP client for making API requests

## 📁 Project Structure

```
frontend/
├── .next/                # Next.js build output
├── app/                  # App router pages and components
│   ├── components/       # Reusable UI components
│   ├── dashboard/        # Dashboard page and related components
│   ├── images/           # Static images used in the application
│   ├── lib/              # Utility functions and helpers
│   ├── train/            # Model training interface components
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Homepage component
├── node_modules/         # Node.js dependencies
├── public/               # Static assets
│   └── home.png          # Home page image
├── .env.local            # Environment variables (not committed to git)
├── .gitignore            # Git ignore file
├── next-env.d.ts         # TypeScript declarations for Next.js
├── next.config.js        # Next.js configuration
├── package-lock.json     # Locked dependencies
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration for Tailwind
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   git clone https://github.com/TusharKarkera22/ZeroTrace-AI
   cd diabetes-predictor/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_NILLION_ENABLED=true
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Features

### Interactive Dashboard
- Real-time diabetes prediction results
- Patient data visualization
- Historical predictions

### Secure Data Handling
- Integration with Nillion for privacy-preserving computations
- Data encryption for sensitive information

### Responsive Design
- Mobile-friendly interface
- Accessible UI components

### Animations
- Smooth transitions between pages
- Interactive elements with Framer Motion

## 💻 Usage

### Patient Data Input
Fill in the patient information form with the required metrics:
- Age
- BMI
- Glucose level
- Blood pressure
- Insulin level
- Skin thickness
- Diabetes pedigree function
- Pregnancies

### Making Predictions
1. Submit the form to get a prediction
2. View detailed prediction results and confidence scores
3. Save predictions for future reference

### Training Interface
Access the model training dashboard to:
- View model performance metrics
- Initiate new training sessions
- Compare model versions

## 🔌 API Integration

The frontend communicates with the backend through a RESTful API using Axios:

```javascript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Example API call for prediction
export const predictDiabetes = async (patientData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error making prediction:", error);
    throw error;
  }
};
```

## 🛡️ Nillion Integration

For privacy-preserving predictions, the frontend integrates with Nillion:

```javascript
// Example of handling secure predictions
const handleSecurePrediction = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(`${API_URL}/secure-predict`, {
      data,
      useNillion: true
    });
    setPredictionResult(response.data);
  } catch (error) {
    setError('Failed to process secure prediction');
  } finally {
    setLoading(false);
  }
};
```


## 🚢 Deployment

Build the production-ready application:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Nillion Documentation](https://docs.nillion.com)
