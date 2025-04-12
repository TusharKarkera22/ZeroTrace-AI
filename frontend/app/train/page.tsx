'use client';
import Navbar from '../components/Navbar';
import ModelTrainingForm from '../components/ModelTrainingForm';
import { useState } from 'react';
import { ModelType, TrainingParameters } from '../lib/secureML';
import { useRouter } from 'next/navigation';

// This needs to be a client component

export default function TrainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const router = useRouter();
  
  const handleTrainingSubmit = async (
    modelType: ModelType,
    datasetIds: string[],
    parameters: TrainingParameters
  ) => {
    try {
      setIsLoading(true);
      setSuccessMessage(null);
      
      // Make API call to the train endpoint
      const response = await fetch('/api/ml/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelType,
          datasetIds,
          parameters,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error starting training: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store the job ID and display success message
      setJobId(data.jobId);
      setSuccessMessage(`Training job started successfully! Job ID: ${data.jobId}`);
      
    } catch (error) {
      console.error('Error submitting training job:', error);
      alert('Failed to start training job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewStatus = () => {
    if (jobId) {
      router.push(`/train/status?jobId=${jobId}`);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Train a Secure ML Model</h1>
            <p className="text-gray-600 mb-8">
              Train machine learning models on healthcare data while preserving privacy. Your data remains encrypted throughout the entire 
              process. The ML algorithms run on the encrypted data using secure computation technology,
              ensuring that sensitive patient information is never exposed.
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            {successMessage ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Training Job Started!</h3>
                <p className="mt-2 text-gray-500">
                  Your secure ML training job has been started. You can view the status using the job ID.
                </p>
                <p className="mt-1 font-mono text-sm bg-gray-100 p-2 rounded inline-block">
                  {jobId}
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleViewStatus}
                    className="btn-primary"
                  >
                    View Training Status
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setSuccessMessage(null);
                      setJobId(null);
                    }}
                    className="text-sm text-primary-600 hover:text-primary-500"
                  >
                    Start Another Training Job
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <p className="mb-6 text-gray-600 bg-blue-50 p-4 rounded-lg">
                  When you train a model with our platform, your data remains fully encrypted throughout the 
                  process. The ML algorithms run on the encrypted data using Nillion's secure computation technology, 
                  ensuring that sensitive healthcare information is never exposed.
                </p>
                
                <ModelTrainingForm 
                  onSubmit={handleTrainingSubmit}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
          
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">How Secure ML Training Works</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900">Encrypted Data</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Your healthcare data is never decrypted during the training process.
                    All computations are performed on encrypted data.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900">Secure Model Building</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    ML algorithms are modified to work with encrypted data using advanced 
                    cryptographic techniques like homomorphic encryption.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-medium text-gray-900">Verified Results</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    All computation results come with cryptographic proofs that verify the training
                    was performed correctly without compromising data privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 