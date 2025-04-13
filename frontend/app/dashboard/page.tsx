import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow mt-10 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Healthcare ML Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Monitor your secure ML models and data usage
            </p>
          </div>
          
          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
  <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <div className="ml-5">
          <dt className="text-sm font-medium text-gray-600 truncate">Total Datasets</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
        </div>
      </div>
    </div>
    <div className="bg-blue-100 px-4 py-4 sm:px-6">
      <div className="text-sm">
        <a href="#" className="font-medium text-blue-700 hover:text-blue-500">
          View all datasets
        </a>
      </div>
    </div>
  </div>
  
  <div className="bg-green-50 overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
        <div className="ml-5">
          <dt className="text-sm font-medium text-gray-600 truncate">Active Models</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">4</dd>
        </div>
      </div>
    </div>
    <div className="bg-green-100 px-4 py-4 sm:px-6">
      <div className="text-sm">
        <a href="#" className="font-medium text-green-700 hover:text-green-500">
          View all models
        </a>
      </div>
    </div>
  </div>
  
  <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div className="ml-5">
          <dt className="text-sm font-medium text-gray-600 truncate">Secure Computations</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">1,293</dd>
        </div>
      </div>
    </div>
    <div className="bg-purple-100 px-4 py-4 sm:px-6">
      <div className="text-sm">
        <a href="#" className="font-medium text-purple-700 hover:text-purple-500">
          View audit logs
        </a>
      </div>
    </div>
  </div>
</div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ML Models Table */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">ML Models</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your machine learning models trained on secure data
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Diabetes Prediction', type: 'RandomForest', accuracy: '92%', status: 'Active' },
                      { name: 'Heart Disease Classifier', type: 'Neural Network', accuracy: '89%', status: 'Active' },
                      { name: 'Cancer Detection', type: 'XGBoost', accuracy: '94%', status: 'Active' },
                      { name: 'Medication Response', type: 'Logistic Regression', accuracy: '87%', status: 'Active' },
                      { name: 'Depression Screening', type: 'RandomForest', accuracy: '81%', status: 'Training' }
                    ].map((model, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {model.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {model.accuracy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            model.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {model.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
  <button className="btn-primary inline-flex items-center bg-blue-600 hover:bg-blue-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
    Train New Model
  </button>
</div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Latest actions on your secure healthcare data
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="space-y-4">
                  {[
                    { 
                      action: 'Model Training Completed', 
                      detail: 'Diabetes Prediction model training finished with 92% accuracy',
                      time: '2 hours ago',
                      icon: (
                        <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )
                    },
                    { 
                      action: 'New Dataset Contributed', 
                      detail: 'Patient records dataset uploaded and securely encrypted',
                      time: '5 hours ago',
                      icon: (
                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                      )
                    },
                    { 
                      action: 'Model Inference Request', 
                      detail: '32 secure predictions made using Heart Disease Classifier',
                      time: '1 day ago',
                      icon: (
                        <div className="flex-shrink-0 bg-purple-100 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )
                    },
                    { 
                      action: 'New Model Training Started', 
                      detail: 'Depression Screening model training initiated',
                      time: '1 day ago',
                      icon: (
                        <div className="flex-shrink-0 bg-yellow-100 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )
                    },
                    { 
                      action: 'Collaboration Invitation', 
                      detail: 'University Research Hospital wants to collaborate on Cancer Detection model',
                      time: '2 days ago',
                      icon: (
                        <div className="flex-shrink-0 bg-pink-100 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      )
                    }
                  ].map((activity, idx) => (
                    <li key={idx} className="px-4 py-3 flex items-start bg-gray-50 rounded-lg">
                      {activity.icon}
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="mt-1 text-sm text-gray-500">{activity.detail}</p>
                        <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>
          </div>
          
          {/* Data Usage Section */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Secure Data Usage</h3>
              <p className="mt-1 text-sm text-gray-500">
                How your data is being used while remaining private and secure
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Data Usage By Model Type</h4>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                    {/* This would be a chart in a real implementation */}
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="w-3/4 h-full flex items-end justify-around">
                        <div className="flex flex-col items-center">
                          <div className="bg-primary-500 w-16 h-48 rounded-t-lg"></div>
                          <span className="mt-2 text-xs text-gray-600">RandomForest</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-secondary-500 w-16 h-32 rounded-t-lg"></div>
                          <span className="mt-2 text-xs text-gray-600">Neural Network</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-green-500 w-16 h-24 rounded-t-lg"></div>
                          <span className="mt-2 text-xs text-gray-600">XGBoost</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-yellow-500 w-16 h-16 rounded-t-lg"></div>
                          <span className="mt-2 text-xs text-gray-600">LogRegression</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Privacy Proof Verifications</h4>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                    {/* Security verification metrics visualization */}
                    <div className="w-full space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Zero-Knowledge Proofs</span>
                          <span className="text-sm font-medium text-gray-700">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Secure MPC Verification</span>
                          <span className="text-sm font-medium text-gray-700">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Input Privacy</span>
                          <span className="text-sm font-medium text-gray-700">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Computation Verification</span>
                          <span className="text-sm font-medium text-gray-700">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          All verifications passed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 