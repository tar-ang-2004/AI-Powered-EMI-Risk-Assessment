// Main JavaScript for EMI Risk Assessment Platform

// Global variables
let isLoading = false;
let currentPrediction = null;
let dashboardCharts = {};

// Sample data sets for different forms
const sampleDataSets = {
    prediction: [
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
        }
    ],
    emiCalculator: [
        {
            loanAmount: 2500000,
            interestRate: 8.5,
            loanTenure: 20,
            tenureType: 'years'
        },
        {
            loanAmount: 1500000,
            interestRate: 9.2,
            loanTenure: 15,
            tenureType: 'years'
        }
    ],
    whatIf: [
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
        }
    ],
    lenders: [
        {
            loanType: 'home',
            loanAmount: 2500000,
            tenure: 20,
            creditScore: 750
        },
        {
            loanType: 'car',
            loanAmount: 800000,
            tenure: 7,
            creditScore: 720
        },
        {
            loanType: 'personal',
            loanAmount: 500000,
            tenure: 5,
            creditScore: 680
        }
    ],
    prepayment: [
        {
            principalRemaining: 1800000,
            currentEMI: 18500,
            interestRate: 8.5,
            remainingTenure: 180,
            prepaymentAmount: 200000
        }
    ]
};

// Utility functions
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Format percentage
    formatPercentage: (value) => {
        return `${(value * 100).toFixed(2)}%`;
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Show notification
    showNotification: (message, type = 'info', duration = 5000) => {
        const notificationContainer = document.getElementById('notification-container') || createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.className = `notification opacity-0 transform translate-x-full transition-all duration-300 ease-in-out`;
        
        const typeColors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        const typeIcons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="flex items-center p-4 ${typeColors[type]} text-white rounded-lg shadow-lg max-w-sm">
                <i class="fas ${typeIcons[type]} mr-3"></i>
                <div class="flex-1">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('opacity-0', 'translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('opacity-0', 'translate-x-full');
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    },

    // Fill sample data function
    fillSampleData: (formType) => {
        const sampleData = sampleDataSets[formType];
        if (!sampleData || sampleData.length === 0) {
            utils.showNotification('No sample data available for this form', 'warning');
            return;
        }

        // Get random sample from the array
        const randomSample = sampleData[Math.floor(Math.random() * sampleData.length)];
        
        // Fill form fields
        Object.keys(randomSample).forEach(fieldName => {
            const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                if (field.type === 'select-one') {
                    field.value = randomSample[fieldName];
                } else if (field.type === 'radio') {
                    const radioButton = document.querySelector(`input[name="${fieldName}"][value="${randomSample[fieldName]}"]`);
                    if (radioButton) {
                        radioButton.checked = true;
                    }
                } else if (field.type === 'checkbox') {
                    field.checked = randomSample[fieldName];
                } else {
                    field.value = randomSample[fieldName];
                }
                
                // Trigger change event to update any dependent fields
                field.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        utils.showNotification(`Sample data filled successfully! 🎯`, 'success');
    },

    // Loading overlay
    showLoading: () => {
        let overlay = document.getElementById('loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            overlay.innerHTML = `
                <div class="bg-white rounded-lg p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p class="text-gray-700">Processing...</p>
                </div>
            `;
        }
        document.body.appendChild(overlay);
        isLoading = true;
    },

    hideLoading: () => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.remove();
        }
        isLoading = false;
    }
};

// Create notification container
function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(container);
    return container;
}

// Global function to fill sample data - can be called from HTML
window.fillSampleData = (formType) => {
    utils.fillSampleData(formType);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded successfully');
    
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});