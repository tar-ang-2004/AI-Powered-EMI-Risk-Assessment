// What-If Page JavaScript
console.log('WhatIf.js loaded successfully');

// Sample data for what-if analysis
const whatIfSamples = [
    {
        currentIncome: 75000,
        currentEMI: 18000,
        currentLoanAmount: 2500000,
        currentTenure: 20,
        newIncome: 90000,
        newEMI: 20000,
        newLoanAmount: 3000000,
        newTenure: 20
    },
    {
        currentIncome: 55000,
        currentEMI: 12000,
        currentLoanAmount: 1500000,
        currentTenure: 15,
        newIncome: 70000,
        newEMI: 15000,
        newLoanAmount: 2000000,
        newTenure: 15
    },
    {
        currentIncome: 100000,
        currentEMI: 25000,
        currentLoanAmount: 3500000,
        currentTenure: 25,
        newIncome: 120000,
        newEMI: 30000,
        newLoanAmount: 4000000,
        newTenure: 25
    }
];

// Show notification function
function showNotification(message, type = 'success') {
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
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Fill sample data function
function fillSampleData() {
    console.log('fillSampleData called for what-if form');
    
    const randomSample = whatIfSamples[Math.floor(Math.random() * whatIfSamples.length)];
    console.log('Selected sample:', randomSample);
    
    Object.keys(randomSample).forEach(fieldName => {
        const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.value = randomSample[fieldName];
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`Filled ${fieldName} with ${randomSample[fieldName]}`);
        }
    });
    
    showNotification('Sample data filled successfully! 🎯', 'success');
}

// Analyze scenarios function
function analyzeScenarios() {
    console.log('analyzeScenarios function called');
    showNotification('What-if scenario analysis starting...', 'info');
    
    const currentIncome = document.getElementById('currentIncome')?.value;
    const newIncome = document.getElementById('newIncome')?.value;
    
    if (!currentIncome || !newIncome) {
        showNotification('Please fill the scenario details to analyze', 'error');
        return;
    }
    
    setTimeout(() => {
        showNotification('Scenario analysis completed!', 'success');
        
        const resultsEl = document.getElementById('analysisResults');
        const noAnalysisEl = document.getElementById('noAnalysis');
        
        if (resultsEl && noAnalysisEl) {
            resultsEl.classList.remove('hidden');
            noAnalysisEl.classList.add('hidden');
        }
    }, 1500);
}

// Switch tab function
function switchTab(tab) {
    console.log('switchTab function called:', tab);
    showNotification(`Switched to ${tab} tab`, 'info');
}

// Make functions globally available
window.fillSampleData = fillSampleData;
window.analyzeScenarios = analyzeScenarios;
window.switchTab = switchTab;

document.addEventListener('DOMContentLoaded', function() {
    console.log('What-If page JavaScript initialized');
});