


"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, CheckCircle, ChevronRight, Lock, Activity } from 'lucide-react';
import axios from 'axios';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Define types
interface PredictionFormData {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
  use_local: boolean;
}

interface PredictionResult {
  diabetes_probability: number;
  risk_level: string;
}

export default function DiabetesPrediction() {
  const [formData, setFormData] = useState<PredictionFormData>({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0,
    use_local: false
  });

  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [predictionError, setPredictionError] = useState<string>('');
  const [processingTime, setProcessingTime] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseFloat(value) : value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsPredicting(true);
    setPredictionResult(null);
    setPredictionError('');
    
    const startTime = new Date().getTime();
    
    try {
      // In a real app this would be your actual API endpoint
      const response = await axios.post<PredictionResult>(
        'https://fast-api-zerotrace-production.up.railway.app/predict', 
        formData
      );
      
      const endTime = new Date().getTime();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      setProcessingTime(timeTaken);
      
      // Handle successful response
      setPredictionResult(response.data);
      
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionError(
        'Error processing your prediction request. Please try again or Free API is shutdown due to excessive credit. Please try running locally.'
      );
    } finally {
      setIsPredicting(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'text-green-600';
      case 'Moderate':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 mt-10 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-center">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-6 shadow-sm border border-blue-200"
            >
              Diabetes Risk Assessment
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Check Your <span className="text-blue-600">Diabetes Risk</span> Securely
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Our AI-powered prediction tool assesses your risk of diabetes based on key health metrics. 
              Choose between standard prediction or privacy-enhanced secure computation using Nillion technology.
            </motion.p>
          </div>
        </motion.div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Prediction Form */}
            <div className="md:col-span-2">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Diabetes Risk Prediction</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pregnancies</label>
                      <input
                        type="number"
                        name="Pregnancies"
                        min="0"
                        step="1"
                        value={formData.Pregnancies}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Glucose (mg/dL)</label>
                      <input
                        type="number"
                        name="Glucose"
                        min="0"
                        value={formData.Glucose}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure (mm Hg)</label>
                      <input
                        type="number"
                        name="BloodPressure"
                        min="0"
                        value={formData.BloodPressure}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skin Thickness (mm)</label>
                      <input
                        type="number"
                        name="SkinThickness"
                        min="0"
                        value={formData.SkinThickness}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Insulin (μU/ml)</label>
                      <input
                        type="number"
                        name="Insulin"
                        min="0"
                        value={formData.Insulin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BMI (weight in kg/(height in m)²)</label>
                      <input
                        type="number"
                        name="BMI"
                        min="0"
                        step="0.1"
                        value={formData.BMI}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diabetes Pedigree Function</label>
                      <input
                        type="number"
                        name="DiabetesPedigreeFunction"
                        min="0"
                        step="0.01"
                        value={formData.DiabetesPedigreeFunction}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                      <input
                        type="number"
                        name="Age"
                        min="0"
                        value={formData.Age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          id="secure-mode"
                          name="use_local"
                          type="checkbox"
                          checked={!formData.use_local}
                          onChange={(e) => setFormData({...formData, use_local: !e.target.checked})}
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="secure-mode" className="flex items-center font-medium text-gray-900">
                          <Lock className="h-4 w-4 text-blue-600 mr-1" />
                          Use Secure Computation (Nillion Technology)
                        </label>
                        <p className="text-sm text-gray-500">
                          Your health data remains encrypted during processing for complete privacy protection
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {predictionError && (
                    <div className="mt-2 text-sm text-red-600 flex items-center space-x-1 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <span>{predictionError}</span>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isPredicting}
                    className={`w-full flex items-center justify-center py-3 px-6 rounded-lg shadow-md text-white font-medium ${isPredicting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isPredicting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Prediction...
                      </>
                    ) : (
                      <>Get Your Risk Assessment</>
                    )}
                  </motion.button>
                </form>
                
                {/* Results Section */}
                {predictionResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 border-t border-gray-200 pt-6"
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-600" />
                        Prediction Results
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                          <p className="text-sm text-gray-500 mb-1">Diabetes Probability</p>
                          <div className="flex items-center">
                            <div className="h-2 w-full bg-gray-200 rounded-full mr-2">
                              <div 
                                className="h-2 bg-blue-600 rounded-full" 
                                style={{ width: `${predictionResult.diabetes_probability * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                              {(predictionResult.diabetes_probability * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                          <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                          <p className={`text-2xl font-bold ${getRiskColor(predictionResult.risk_level)}`}>
                            {predictionResult.risk_level}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-blue-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">{formData.use_local ? 'Standard computation' : 'Secure computation'}</span>
                            {!formData.use_local && <Shield className="h-4 w-4 text-green-600" />}
                          </div>
                          {processingTime && (
                            <div className="text-sm text-gray-500">
                              Processing time: {processingTime}s
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-sm text-gray-600 italic">
                          Note: This prediction is an estimate based on the information provided and should not replace professional medical advice.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        href="/dashboard" 
                        className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition"
                      >
                        View educational resources about diabetes
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            {/* Right Column - Info */}
            <div>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 mb-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Privacy Options</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="flex items-center text-md font-semibold text-gray-900 mb-2">
                      <Lock className="h-4 w-4 mr-2 text-blue-600" />
                      Secure Computation
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Your health data remains encrypted during processing using Nillion's breakthrough privacy technology.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>Data never exposed in unencrypted form</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>No possibility of data leakage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>Slightly slower processing time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="flex items-center text-md font-semibold text-gray-900 mb-2">
                      <Activity className="h-4 w-4 mr-2 text-gray-600" />
                      Standard Computation
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Traditional prediction using our trained model with standard security measures.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>Faster results</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>Standard TLS encryption in transit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5 mr-1" />
                        <span>Data temporarily unencrypted during processing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Model</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full mr-2">
                        <div className="h-2 bg-green-500 rounded-full w-4/5"></div>
                      </div>
                      <p className="text-lg font-medium">79%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Model Type</p>
                    <p className="text-md font-medium">Gradient Boosting Classifier</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Training Data</p>
                    <p className="text-md font-medium">Pima Indians Diabetes Database</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="text-md font-medium">April 5, 2025</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      This prediction tool is designed for educational purposes only. 
                      Always consult with healthcare professionals for medical diagnosis and advice.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-16 px-6 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Diabetes Risk Factors</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Our prediction model analyzes these key health metrics to assess your risk of diabetes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path><path d="M2 20h20"></path><path d="M14 12v.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Glucose Level</h3>
              <p className="text-gray-600">
                Blood glucose is a primary indicator. Consistently high levels may indicate insulin resistance or reduced insulin production.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">BMI</h3>
              <p className="text-gray-600">
                Body Mass Index measures body fat based on height and weight. Higher BMI correlates with increased diabetes risk.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Blood Pressure</h3>
              <p className="text-gray-600">
                Hypertension often co-occurs with insulin resistance, making it an important factor in diabetes risk assessment.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insulin</h3>
              <p className="text-gray-600">
                Insulin resistance is a key factor in type 2 diabetes. Our model analyzes insulin levels to assess pancreatic function.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
            {/* Improved Footer */}
            <footer className="mt-auto py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <h2 className="text-2xl font-bold">Zerotrace-AI</h2>
              </div>
              <p className="text-gray-400 mb-6">Secure healthcare ML platform powered by Nillion's privacy-preserving technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/data-contribution" className="text-gray-400 hover:text-white transition">Contribute Data</Link></li>
                <li><Link href="/train" className="text-gray-400 hover:text-white transition">Train Models</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Privacy</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Center</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-white transition">HIPAA Compliance</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-white transition">Security Measures</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  info@securehealth.example
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  123 Privacy Way, Secure City
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2023 SecureHealth. All rights reserved. Powered by Nillion technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}