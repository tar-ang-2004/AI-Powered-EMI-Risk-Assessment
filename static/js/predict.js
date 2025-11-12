// Predict Page JavaScript
console.log('Predict.js loaded successfully');

// Sample data for prediction form
const predictionSamples = [
    {
        age: 32,
        gender: 'Male',
        marital_status: 'Married',
        education: 'Graduate',
        family_size: 4,
        dependents: 2,
        employment_type: 'Private',
        company_type: 'MNC',
        work_experience: 8,
        job_stability: 'Stable',
        monthly_income: 85000,
        other_income: 5000,
        monthly_expenses: 45000,
        existing_loans: 'Yes',
        existing_emi: 15000,
        loan_purpose: 'Home',
        loan_amount: 2500000,
        loan_tenure: 20,
        collateral: 'Yes',
        credit_score: 750,
        bank_relationship: 'Yes',
        previous_defaults: 'No'
    },
    {
        age: 28,
        gender: 'Female',
        marital_status: 'Single',
        education: 'Post_Graduate',
        family_size: 2,
        dependents: 0,
        employment_type: 'Government',
        company_type: 'Others',
        work_experience: 5,
        job_stability: 'Very_Stable',
        monthly_income: 65000,
        other_income: 2000,
        monthly_expenses: 35000,
        existing_loans: 'No',
        existing_emi: 0,
        loan_purpose: 'Personal',
        loan_amount: 500000,
        loan_tenure: 5,
        collateral: 'No',
        credit_score: 780,
        bank_relationship: 'Yes',
        previous_defaults: 'No'
    },
    {
        age: 45,
        gender: 'Male',
        marital_status: 'Married',
        education: 'Undergraduate',
        family_size: 5,
        dependents: 3,
        employment_type: 'Self_Employed',
        company_type: 'SME',
        work_experience: 15,
        job_stability: 'Moderate',
        monthly_income: 120000,
        other_income: 25000,
        monthly_expenses: 70000,
        existing_loans: 'Yes',
        existing_emi: 35000,
        loan_purpose: 'Business',
        loan_amount: 1500000,
        loan_tenure: 10,
        collateral: 'Yes',
        credit_score: 680,
        bank_relationship: 'No',
        previous_defaults: 'No'
    }
];

// Show notification function
function showNotification(message, type = 'success') {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Fill sample data function
function fillSampleData() {
    console.log('fillSampleData called for prediction form');
    
    // Get random sample
    const randomSample = predictionSamples[Math.floor(Math.random() * predictionSamples.length)];
    console.log('Selected sample:', randomSample);
    
    // Fill all form fields
    Object.keys(randomSample).forEach(fieldName => {
        const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            if (field.tagName === 'SELECT') {
                field.value = randomSample[fieldName];
            } else if (field.type === 'radio') {
                const radioButton = document.querySelector(`input[name="${fieldName}"][value="${randomSample[fieldName]}"]`);
                if (radioButton) {
                    radioButton.checked = true;
                }
            } else if (field.type === 'checkbox') {
                field.checked = randomSample[fieldName] === 'Yes' || randomSample[fieldName] === true;
            } else {
                field.value = randomSample[fieldName];
            }
            
            // Trigger change event
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`Filled ${fieldName} with ${randomSample[fieldName]}`);
        } else {
            console.warn(`Field ${fieldName} not found`);
        }
    });
    
    showNotification('Sample data filled successfully! 🎯', 'success');
}

// Make function globally available
window.fillSampleData = fillSampleData;

// Real-time prediction function with ML integration
window.makePrediction = function() {
    const formData = new FormData(document.querySelector('form'));
    const customerData = {};
    
    // Convert form data to object
    for (let [key, value] of formData.entries()) {
        customerData[key] = value;
    }
    
    console.log('Making prediction with data:', customerData);
    
    // Show loading state
    showNotification('Making prediction... 🔄', 'info');
    
    // Send prediction request
    fetch('/api/predict_eligibility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showNotification(`Prediction failed: ${data.error}`, 'error');
        } else {
            // Display prediction results
            displayPredictionResults(data);
            showNotification('Prediction completed successfully! ✅', 'success');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Network error during prediction', 'error');
    });
};

// Display prediction results
function displayPredictionResults(result) {
    let resultsDiv = document.getElementById('predictionResults');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'predictionResults';
        const form = document.querySelector('form');
        form.parentNode.insertBefore(resultsDiv, form.nextSibling);
    }
    
    const confidence = result.confidence ? (result.confidence * 100).toFixed(1) : 'N/A';
    const predictionTime = result.prediction_time ? (result.prediction_time * 1000).toFixed(0) : 'N/A';
    
    resultsDiv.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mt-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">🎯 ML Prediction Results</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h4 class="font-semibold text-gray-700">EMI Eligibility Status</h4>
                    <p class="text-2xl font-bold text-green-600">${result.prediction || 'Processing...'}</p>
                    <p class="text-sm text-gray-500">Confidence: ${confidence}%</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h4 class="font-semibold text-gray-700">Processing Time</h4>
                    <p class="text-2xl font-bold text-blue-600">${predictionTime}ms</p>
                    <p class="text-sm text-gray-500">ML model response time</p>
                </div>
            </div>
            
            ${result.probabilities ? `
                <div class="mt-4">
                    <h4 class="font-semibold text-gray-700 mb-2">Prediction Probabilities</h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                        ${Object.entries(result.probabilities).map(([key, value]) => `
                            <div class="bg-gray-100 p-2 rounded text-center">
                                <span class="text-sm text-gray-600">${key.replace('Class_', 'Category ')}</span>
                                <div class="font-semibold text-blue-600">${(value * 100).toFixed(1)}%</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                    This prediction is generated using machine learning models trained on historical EMI data.
                    Timestamp: ${new Date(result.timestamp).toLocaleString()}
                </p>
            </div>
        </div>
    `;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add prediction button to the form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Predict page JavaScript initialized');
    
    // Add predict button if it doesn't exist
    const form = document.querySelector('form');
    if (form && !document.getElementById('predictButton')) {
        const submitButtonContainer = form.querySelector('.text-center') || form.querySelector('button[type="submit"]').parentElement;
        
        if (submitButtonContainer) {
            const predictButton = document.createElement('button');
            predictButton.id = 'predictButton';
            predictButton.type = 'button';
            predictButton.onclick = makePrediction;
            predictButton.className = 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg ml-4';
            predictButton.innerHTML = '<i class="fas fa-brain mr-2"></i>Predict with ML';
            
            submitButtonContainer.appendChild(predictButton);
        }
    }
});