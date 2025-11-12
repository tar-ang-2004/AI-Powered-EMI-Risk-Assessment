// Prepayment Page JavaScript
console.log('Prepayment.js loaded successfully');

// Sample data for prepayment analysis
const prepaymentSamples = [
    {
        principalRemaining: 1800000,
        currentEMI: 18500,
        interestRate: 8.5,
        remainingTenure: 15,
        prepaymentAmount: 200000
    },
    {
        principalRemaining: 950000,
        currentEMI: 12500,
        interestRate: 9.2,
        remainingTenure: 10,
        prepaymentAmount: 100000
    },
    {
        principalRemaining: 2200000,
        currentEMI: 22000,
        interestRate: 7.8,
        remainingTenure: 18,
        prepaymentAmount: 500000
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
    console.log('fillSampleData called for prepayment form');
    
    const randomSample = prepaymentSamples[Math.floor(Math.random() * prepaymentSamples.length)];
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

// Calculate prepayment function
function calculatePrepayment() {
    console.log('calculatePrepayment function called');
    showNotification('Calculating prepayment benefits...', 'info');
    
    const principal = document.getElementById('principalRemaining')?.value;
    const currentEMI = document.getElementById('currentEMI')?.value;
    
    if (!principal || !currentEMI) {
        showNotification('Please fill loan details to calculate prepayment benefits', 'error');
        return;
    }
    
    setTimeout(() => {
        showNotification('Prepayment analysis completed!', 'success');
        
        const resultsEl = document.getElementById('prepaymentResults');
        const noResultsEl = document.getElementById('noResults');
        
        if (resultsEl && noResultsEl) {
            resultsEl.classList.remove('hidden');
            noResultsEl.classList.add('hidden');
        }
    }, 1500);
}

// Toggle prepayment inputs function
function togglePrepaymentInputs() {
    console.log('togglePrepaymentInputs function called');
    const strategy = document.getElementById('prepaymentStrategy')?.value;
    showNotification(`Prepayment strategy changed to: ${strategy}`, 'info');
}

// Make functions globally available but do not overwrite page-provided implementations
window.fillSampleData = window.fillSampleData || fillSampleData;
// Provide a compatibility wrapper for callers of window.calculatePrepayment:
// - If page provides `baseCalculatePrepayment`, delegate to it.
// - Otherwise use the legacy implementation.
if (typeof window.calculatePrepayment !== 'function') {
    window.calculatePrepayment = function() {
        if (typeof window.baseCalculatePrepayment === 'function') {
            return window.baseCalculatePrepayment.apply(this, arguments);
        }
        return calculatePrepayment.apply(this, arguments);
    };
}

window.togglePrepaymentInputs = window.togglePrepaymentInputs || togglePrepaymentInputs;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Prepayment page JavaScript initialized');
});