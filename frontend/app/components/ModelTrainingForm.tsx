import { useState } from 'react';
import { ModelType, TrainingParameters } from '../lib/secureML';

interface ModelTrainingFormProps {
  onSubmit: (modelType: ModelType, datasetIds: string[], parameters: TrainingParameters) => Promise<void>;
  availableDatasets?: Array<{ id: string; name: string; type: string; recordCount: number }>;
  isLoading?: boolean;
}

export default function ModelTrainingForm({ 
  onSubmit, 
  availableDatasets = [], 
  isLoading = false 
}: ModelTrainingFormProps) {
  const [modelType, setModelType] = useState<ModelType>(ModelType.LOGISTIC_REGRESSION);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [parameters, setParameters] = useState<TrainingParameters>({
    epochs: 10,
    batchSize: 32,
    learningRate: 0.001,
  });
  const [consentChecked, setConsentChecked] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDatasets.length === 0) {
      alert('Please select at least one dataset');
      return;
    }
    
    try {
      await onSubmit(modelType, selectedDatasets, parameters);
    } catch (error) {
      console.error('Error submitting training job:', error);
      alert('Failed to submit training job. Please try again.');
    }
  };

  // Toggle dataset selection
  const toggleDataset = (datasetId: string) => {
    setSelectedDatasets(prev => 
      prev.includes(datasetId)
        ? prev.filter(id => id !== datasetId)
        : [...prev, datasetId]
    );
  };

  // Update parameter values
  const updateParameter = (key: keyof TrainingParameters, value: any) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Get additional parameters based on model type
  const getModelSpecificParameters = () => {
    switch (modelType) {
      case ModelType.RANDOM_FOREST:
        return (
          <>
            <div>
              <label htmlFor="numTrees" className="block text-sm font-medium text-gray-700">
                Number of Trees
              </label>
              <input
                type="number"
                id="numTrees"
                min="1"
                max="1000"
                className="mt-1 input w-full"
                value={parameters.numTrees || 100}
                onChange={(e) => updateParameter('numTrees', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="maxDepth" className="block text-sm font-medium text-gray-700">
                Max Depth
              </label>
              <input
                type="number"
                id="maxDepth"
                min="1"
                max="100"
                className="mt-1 input w-full"
                value={parameters.maxDepth || 10}
                onChange={(e) => updateParameter('maxDepth', parseInt(e.target.value))}
              />
            </div>
          </>
        );
      
      case ModelType.NEURAL_NETWORK:
        // Convert comma-separated string to array of numbers for hidden layers
        const hiddenLayersStr = Array.isArray(parameters.hiddenLayers) 
          ? parameters.hiddenLayers.join(',') 
          : '128,64';
        
        return (
          <>
            <div>
              <label htmlFor="hiddenLayers" className="block text-sm font-medium text-gray-700">
                Hidden Layers (comma-separated)
              </label>
              <input
                type="text"
                id="hiddenLayers"
                className="mt-1 input w-full"
                value={hiddenLayersStr}
                onChange={(e) => {
                  const layers = e.target.value.split(',')
                    .map(layer => parseInt(layer.trim()))
                    .filter(layer => !isNaN(layer));
                  updateParameter('hiddenLayers', layers);
                }}
                placeholder="128,64"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="l1Regularization" className="block text-sm font-medium text-gray-700">
                  L1 Regularization
                </label>
                <input
                  type="number"
                  id="l1Regularization"
                  step="0.0001"
                  min="0"
                  max="1"
                  className="mt-1 input w-full"
                  value={parameters.l1Regularization || 0.0001}
                  onChange={(e) => updateParameter('l1Regularization', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="l2Regularization" className="block text-sm font-medium text-gray-700">
                  L2 Regularization
                </label>
                <input
                  type="number"
                  id="l2Regularization"
                  step="0.0001"
                  min="0"
                  max="1"
                  className="mt-1 input w-full"
                  value={parameters.l2Regularization || 0.0001}
                  onChange={(e) => updateParameter('l2Regularization', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  // Sample datasets if none provided
  const datasets = availableDatasets.length > 0 ? availableDatasets : [
    { id: 'dataset1', name: 'Patient Records 2023', type: 'patient_records', recordCount: 12500 },
    { id: 'dataset2', name: 'Diagnostic Images - MRI', type: 'diagnostic_images', recordCount: 5300 },
    { id: 'dataset3', name: 'Lab Results Q1 2023', type: 'lab_results', recordCount: 8700 },
    { id: 'dataset4', name: 'Treatment Outcomes 2022', type: 'treatment_outcomes', recordCount: 4200 },
    { id: 'dataset5', name: 'Patient Records 2022', type: 'patient_records', recordCount: 11800 },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="modelType" className="block text-sm font-medium text-gray-700">
          Model Type
        </label>
        <select
          id="modelType"
          className="mt-1 input w-full"
          value={modelType}
          onChange={(e) => setModelType(e.target.value as ModelType)}
        >
          <option value={ModelType.LOGISTIC_REGRESSION}>Logistic Regression</option>
          <option value={ModelType.RANDOM_FOREST}>Random Forest</option>
          <option value={ModelType.NEURAL_NETWORK}>Neural Network</option>
          <option value={ModelType.XGBOOST}>XGBoost</option>
        </select>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Select Datasets</h3>
        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
          {datasets.map(dataset => (
            <div key={dataset.id} className="flex items-center space-x-3 py-2 border-b border-gray-200 last:border-0">
              <input
                type="checkbox"
                id={`dataset-${dataset.id}`}
                checked={selectedDatasets.includes(dataset.id)}
                onChange={() => toggleDataset(dataset.id)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor={`dataset-${dataset.id}`} className="flex-1 cursor-pointer">
                <div className="font-medium text-gray-900">{dataset.name}</div>
                <div className="text-sm text-gray-500">
                  {dataset.type} · {dataset.recordCount.toLocaleString()} records
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Selected: {selectedDatasets.length} datasets
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Training Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="epochs" className="block text-sm font-medium text-gray-700">
              Epochs
            </label>
            <input
              type="number"
              id="epochs"
              min="1"
              max="1000"
              className="mt-1 input w-full"
              value={parameters.epochs || 10}
              onChange={(e) => updateParameter('epochs', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="batchSize" className="block text-sm font-medium text-gray-700">
              Batch Size
            </label>
            <input
              type="number"
              id="batchSize"
              min="1"
              max="1024"
              className="mt-1 input w-full"
              value={parameters.batchSize || 32}
              onChange={(e) => updateParameter('batchSize', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="learningRate" className="block text-sm font-medium text-gray-700">
              Learning Rate
            </label>
            <input
              type="number"
              id="learningRate"
              step="0.0001"
              min="0.0001"
              max="1"
              className="mt-1 input w-full"
              value={parameters.learningRate || 0.001}
              onChange={(e) => updateParameter('learningRate', parseFloat(e.target.value))}
            />
          </div>
        </div>
        
        {/* Render model-specific parameters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {getModelSpecificParameters()}
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacyConsent"
            className="mt-1 mr-2"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            required
          />
          <label htmlFor="privacyConsent" className="text-sm text-gray-700">
            I understand that my data will be processed securely using zero-knowledge computation,
            ensuring privacy throughout the entire ML training process. I consent to the use of my 
            encrypted data for training the selected model.
          </label>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isLoading || selectedDatasets.length === 0}
        >
          {isLoading ? 'Starting Training...' : 'Start Secure Training'}
        </button>
      </div>
    </form>
  );
} 