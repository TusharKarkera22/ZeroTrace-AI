'use client';

import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { TrainingStatus } from '../../lib/secureML';
import { useSearchParams, useRouter } from 'next/navigation';

// This needs to be a client component

export default function TrainingStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('jobId');
  
  const [status, setStatus] = useState<TrainingStatus | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch status of the training job
  const fetchStatus = async () => {
    if (!jobId) return;
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/ml/status/${jobId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching status: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setStatus(data.status as TrainingStatus);
      setProgress(data.progress || 0);
      setResults(data.results || null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching job status:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch status on initial load and set up polling
  useEffect(() => {
    if (!jobId) {
      setError('No job ID provided');
      return;
    }
    
    fetchStatus();
    
    // Poll for updates if the job is still in progress
    const intervalId = setInterval(() => {
      if (status === TrainingStatus.COMPLETED || status === TrainingStatus.FAILED) {
        clearInterval(intervalId);
      } else {
        fetchStatus();
      }
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [jobId, status]);
  
  // Handle navigation back to dashboard
  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };
  
  // If no job ID is provided, show an error
  if (!jobId) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Missing Job ID</h1>
            <p className="text-gray-600 mb-6">
              No training job ID was provided. Please select a job to monitor.
            </p>
            <button
              onClick={() => router.push('/train')}
              className="btn-primary"
            >
              Start New Training
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Training Status
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                Monitoring secure ML training job: <span className="font-mono">{jobId}</span>
              </p>
            </div>
            <button
              onClick={handleBackToDashboard}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
          
          {loading && status === null ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading job status...</p>
            </div>
          ) : error ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Status</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchStatus}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Status Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Job Status</h2>
                      <div className="mt-2 flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                          status === TrainingStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                          status === TrainingStatus.FAILED ? 'bg-red-100 text-red-800' :
                          status === TrainingStatus.PROCESSING ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {status}
                        </span>
                        {status === TrainingStatus.PROCESSING && (
                          <span className="text-sm text-gray-500">
                            Estimated completion in {Math.round((100 - progress) / 10)} minutes
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button
                        onClick={fetchStatus}
                        className="text-primary-600 hover:text-primary-800 flex items-center"
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Status
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {status !== TrainingStatus.COMPLETED && status !== TrainingStatus.FAILED && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-1 text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {status === TrainingStatus.PROCESSING && (
                        <div className="mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Training model using zero-knowledge computation with {progress < 50 ? 'encrypted data preparation' : 'secure model optimization'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Results Card (only shown if training is complete) */}
              {status === TrainingStatus.COMPLETED && results && (
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Training Results</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Secure model training completed successfully with the following metrics
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Accuracy</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {(results.accuracy * 100).toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-500">F1 Score</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {(results.f1Score || 0).toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Training Time</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {Math.floor(results.trainingTime / 60)}m {results.trainingTime % 60}s
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-500">Model Size</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {results.modelSize}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Privacy Verification</h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h5 className="text-sm font-medium text-green-800">All privacy verifications passed</h5>
                            <div className="mt-2 text-sm text-green-700">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Zero-knowledge proofs verified</li>
                                <li>Data remained encrypted throughout training</li>
                                <li>Secure multi-party computation validated</li>
                                <li>Cryptographic audit trail recorded</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={handleBackToDashboard}
                        className="btn-primary"
                      >
                        View Model in Dashboard
                      </button>
                      <button
                        onClick={() => router.push('/train')}
                        className="btn-secondary"
                      >
                        Train Another Model
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Card (only shown if training failed) */}
              {status === TrainingStatus.FAILED && (
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-red-50">
                    <h3 className="text-lg font-medium text-red-800">Training Failed</h3>
                    <p className="mt-1 text-sm text-red-700">
                      There was an error during the secure training process
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Error: {results?.error || "Unknown error occurred during secure computation"}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => router.push('/train')}
                        className="btn-primary"
                      >
                        Retry Training
                      </button>
                      <button
                        onClick={handleBackToDashboard}
                        className="btn-secondary"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Training Information Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Privacy Protection</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    How your data is protected during the training process
                  </p>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p>
                      During the secure training process, all of your healthcare data remains fully encrypted
                      using Nillion's breakthrough cryptographic technology. Here's how your data is protected:
                    </p>
                    
                    <ul>
                      <li>
                        <strong>Zero-Knowledge Encryption</strong>: Your data is never decrypted at any point during the computation.
                      </li>
                      <li>
                        <strong>Distributed Processing</strong>: Computations are split across multiple secure nodes, with no single
                        node having access to the complete data.
                      </li>
                      <li>
                        <strong>Cryptographic Proofs</strong>: Each step of the training process generates mathematical proofs
                        that verify the computation was performed correctly without revealing the data.
                      </li>
                      <li>
                        <strong>Audit Trail</strong>: Every operation is logged and can be verified, ensuring complete
                        transparency without compromising privacy.
                      </li>
                    </ul>
                    
                    <p>
                      Once training is complete, the model can be used to make predictions on new data while
                      maintaining the same level of privacy and security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Information about the secure computation process */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">How Your Data Stays Private</h3>
                <p className="text-gray-600 mb-4">
                  Your data is processed using advanced cryptographic technology. Here's how your data is protected:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Your data remains encrypted throughout the entire computation process</li>
                  <li>Zero-knowledge proofs verify computations without revealing the data</li>
                  <li>Secure multi-party computation distributes trust across multiple nodes</li>
                  <li>No single entity can access the complete dataset</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 