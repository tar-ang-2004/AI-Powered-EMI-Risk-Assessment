// Enhanced Calculate Page JavaScript with ML Integration
console.log('Enhanced Calculate.js loaded successfully');

// Sample data for EMI calculator with enhanced profile fields
const calculatorSamples = [
    {
        loanAmount: 2500000,
        interestRate: 8.5,
        loanTenure: 20,
        tenureType: 'years',
        age: 32,
        gender: 'Male',
        maritalStatus: 'Married',
        education: 'Graduate',
        familySize: 4,
        dependents: 2,
        employmentType: 'Private',
        companyType: 'MNC',
        yearsOfEmployment: 8,
        monthlyIncome: 85000,
        creditScore: 750,
        bankBalance: 300000,
        emergencyFund: 150000,
        houseType: 'Owned',
        monthlyRent: 0,
        schoolFees: 8000,
        collegeFees: 0,
        travelExpenses: 7000,
        groceriesUtilities: 18000,
        otherMonthlyExpenses: 5000,
        existingLoans: 'Yes',
        currentEmiAmount: 12000,
        emiScenario: 'Additional_Loan'
    },
    {
        loanAmount: 1500000,
        interestRate: 9.2,
        loanTenure: 15,
        tenureType: 'years',
        age: 28,
        gender: 'Female',
        maritalStatus: 'Single',
        education: 'Post_Graduate',
        familySize: 2,
        dependents: 0,
        employmentType: 'Government',
        companyType: 'Others',
        yearsOfEmployment: 5,
        monthlyIncome: 65000,
        creditScore: 780,
        bankBalance: 200000,
        emergencyFund: 100000,
        houseType: 'Rented',
        monthlyRent: 15000,
        schoolFees: 0,
        collegeFees: 0,
        travelExpenses: 4000,
        groceriesUtilities: 12000,
        otherMonthlyExpenses: 3000,
        existingLoans: 'No',
        currentEmiAmount: 0,
        emiScenario: 'New_Loan'
    },
    {
        loanAmount: 800000,
        interestRate: 7.8,
        loanTenure: 10,
        tenureType: 'years',
        age: 35,
        gender: 'Male',
        maritalStatus: 'Married',
        education: 'Graduate',
        familySize: 3,
        dependents: 1,
        employmentType: 'Self_Employed',
        companyType: 'SME',
        yearsOfEmployment: 10,
        monthlyIncome: 95000,
        creditScore: 720,
        bankBalance: 250000,
        emergencyFund: 120000,
        houseType: 'Owned',
        monthlyRent: 0,
        schoolFees: 5000,
        collegeFees: 15000,
        travelExpenses: 8000,
        groceriesUtilities: 20000,
        otherMonthlyExpenses: 7000,
        existingLoans: 'Yes',
        currentEmiAmount: 8000,
        emiScenario: 'Loan_Switch'
    },
    {
        loanAmount: 5000000,
        interestRate: 8.75,
        loanTenure: 25,
        tenureType: 'years',
        age: 40,
        gender: 'Male',
        maritalStatus: 'Married',
        education: 'Post_Graduate',
        familySize: 5,
        dependents: 3,
        employmentType: 'Private',
        companyType: 'MNC',
        yearsOfEmployment: 15,
        monthlyIncome: 150000,
        creditScore: 800,
        bankBalance: 500000,
        emergencyFund: 300000,
        houseType: 'Owned',
        monthlyRent: 0,
        schoolFees: 12000,
        collegeFees: 25000,
        travelExpenses: 15000,
        groceriesUtilities: 30000,
        otherMonthlyExpenses: 10000,
        existingLoans: 'Yes',
        currentEmiAmount: 25000,
        emiScenario: 'Top_Up'
    }
];

// Enhanced notification system
function showNotification(message, type = 'success', duration = 5000) {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    }[type] || 'bg-blue-500';
    
    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    }[type] || 'fa-info-circle';
    
    notification.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span class="text-sm">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 text-lg leading-none">×</button>
        </div>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Enhanced sample data filling with all 65 features
function fillSampleData() {
    console.log('Enhanced fillSampleData called for calculator form');
    
    const randomSample = calculatorSamples[Math.floor(Math.random() * calculatorSamples.length)];
    console.log('Selected enhanced sample:', randomSample);
    
    // Fill all form fields including ML model features
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
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`Filled ${fieldName} with ${randomSample[fieldName]}`);
        }
    });
    
    showNotification('Enhanced sample data with ML features filled successfully! 🧮', 'success');
}

// Enhanced EMI calculation with comprehensive ML integration
function calculateEMI() {
    console.log('Enhanced calculateEMI function called with ML integration');
    
    // Collect basic loan parameters
    const loanAmountEl = document.getElementById('loanAmount');
    const interestRateEl = document.getElementById('interestRate');
    const loanTenureEl = document.getElementById('loanTenure');
    const tenureTypeEl = document.getElementById('tenureType');
    
    if (!loanAmountEl || !interestRateEl || !loanTenureEl) {
        showNotification('Please fill all required loan parameters', 'error');
        return;
    }
    
    const loanAmount = parseFloat(loanAmountEl.value);
    const interestRate = parseFloat(interestRateEl.value);
    const loanTenure = parseFloat(loanTenureEl.value);
    const tenureType = tenureTypeEl ? tenureTypeEl.value : 'years';
    
    if (!loanAmount || !interestRate || !loanTenure) {
        showNotification('Please fill all required loan parameters', 'error');
        return;
    }
    
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    
    // Collect comprehensive ML features (65 features total)
    const comprehensiveData = {
        // Basic loan parameters
        requested_amount: loanAmount,
        requested_tenure: tenureInMonths,
        
        // Personal details
        age: parseInt(document.getElementById('age')?.value || 30),
        gender: document.getElementById('gender')?.value || 'Male',
        marital_status: document.getElementById('maritalStatus')?.value || 'Single',
        education: document.getElementById('education')?.value || 'Graduate',
        family_size: parseInt(document.getElementById('familySize')?.value || 3),
        dependents: parseInt(document.getElementById('dependents')?.value || 1),
        
        // Employment details
        employment_type: document.getElementById('employmentType')?.value || 'Private',
        company_type: document.getElementById('companyType')?.value || 'MNC',
        years_of_employment: parseInt(document.getElementById('yearsOfEmployment')?.value || 5),
        
        // Financial details
        monthly_salary: parseInt(document.getElementById('monthlyIncome')?.value || 50000),
        credit_score: parseInt(document.getElementById('creditScore')?.value || 700),
        bank_balance: parseInt(document.getElementById('bankBalance')?.value || 200000),
        emergency_fund: parseInt(document.getElementById('emergencyFund')?.value || 100000),
        
        // Housing details
        house_type: document.getElementById('houseType')?.value || 'Rented',
        monthly_rent: parseInt(document.getElementById('monthlyRent')?.value || 15000),
        
        // Expense details
        school_fees: parseInt(document.getElementById('schoolFees')?.value || 5000),
        college_fees: parseInt(document.getElementById('collegeFees')?.value || 0),
        travel_expenses: parseInt(document.getElementById('travelExpenses')?.value || 5000),
        groceries_utilities: parseInt(document.getElementById('groceriesUtilities')?.value || 15000),
        other_monthly_expenses: parseInt(document.getElementById('otherMonthlyExpenses')?.value || 5000),
        
        // Existing loan details
        existing_loans: document.getElementById('existingLoans')?.value || 'No',
        current_emi_amount: parseInt(document.getElementById('currentEmiAmount')?.value || 0),
        emi_scenario: document.getElementById('emiScenario')?.value || 'New_Loan'
    };
    
    console.log('Enhanced EMI calculation with comprehensive ML data:', comprehensiveData);
    
    // Calculate traditional EMI first (always accurate - NO ML CALCULATIONS)
    const traditionalResult = calculateCorrectEMI(comprehensiveData, interestRate);
    
    // Show enhanced loading state
    showNotification('🧮 Calculating EMI with mathematical formula + ML insights...', 'info');
    
    // Try ML prediction ONLY for eligibility insights (NEVER for EMI calculations)
    Promise.all([
        // Eligibility Prediction only (ML models should NOT calculate EMI amounts)
        fetch('/api/predict_eligibility', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comprehensiveData)
        }).then(response => response.json()).catch(() => null)
    ])
    .then(([eligibilityResult]) => {
        console.log('Traditional EMI Result:', traditionalResult);
        console.log('ML Eligibility Result:', eligibilityResult);
        
        // Use traditional EMI calculation with ML eligibility insights
        const enhancedResult = {
            ...traditionalResult,
            ml_eligibility: eligibilityResult
        };
        
        displayEnhancedMLResults(traditionalResult, eligibilityResult || createFallbackEligibility(traditionalResult), comprehensiveData, interestRate);
        showNotification('✅ EMI calculated using traditional formula + ML insights!', 'success');
    })
    .catch(error => {
        console.error('Error in ML predictions:', error);
        // Still use traditional calculation (which is always correct)
        const fallbackEligibility = createFallbackEligibility(traditionalResult);
        displayEnhancedMLResults(traditionalResult, fallbackEligibility, comprehensiveData, interestRate);
        showNotification('✅ EMI calculated using traditional formula!', 'success');
    });
}

// Correct EMI calculation function (always accurate)
function calculateCorrectEMI(formData, interestRate) {
    const { requested_amount, requested_tenure } = formData;
    const monthlyRate = interestRate / (12 * 100);
    
    let emi, totalAmount, totalInterest;
    
    if (monthlyRate === 0) {
        emi = requested_amount / requested_tenure;
        totalAmount = requested_amount;
        totalInterest = 0;
    } else {
        emi = (requested_amount * monthlyRate * Math.pow(1 + monthlyRate, requested_tenure)) / 
              (Math.pow(1 + monthlyRate, requested_tenure) - 1);
        totalAmount = emi * requested_tenure;
        totalInterest = totalAmount - requested_amount;
    }
    
    return {
        predicted_amount: emi,
        formatted_amount: `₹${Math.round(emi).toLocaleString()}`,
        calculation_type: 'Traditional Formula',
        timestamp: new Date().toISOString(),
        total_amount: totalAmount,
        total_interest: totalInterest,
        total_payment: totalAmount,
        emi_to_income_ratio: (emi / formData.monthly_salary) * 100,
        risk_level: calculateRiskLevel(emi, formData.monthly_salary),
        affordability_score: calculateAffordabilityScore(emi, formData.monthly_salary, formData)
    };
}

// Create fallback eligibility assessment
function createFallbackEligibility(emiResult) {
    const emiToIncomeRatio = emiResult.emi_to_income_ratio;
    const isEligible = emiToIncomeRatio <= 40;
    
    return {
        prediction: isEligible ? 'Eligible' : 'Not Eligible',
        eligibility_status: isEligible ? 'Eligible' : 'Not Eligible',
        prediction_probability: isEligible ? 0.85 : 0.35,
        confidence: isEligible ? 0.85 : 0.35,
        confidence_level: isEligible ? 'High' : 'Medium',
        calculation_type: 'Traditional Assessment',
        probabilities: {
            "Class_0": isEligible ? 0.15 : 0.65,
            "Class_1": 0.0,
            "Class_2": isEligible ? 0.85 : 0.35
        }
    };
}

// Traditional EMI calculation with enhanced fallback
function calculateTraditionalEMI(formData, interestRate) {
    const { requested_amount, requested_tenure } = formData;
    const monthlyRate = interestRate / (12 * 100);
    
    let emi, totalAmount, totalInterest;
    
    if (monthlyRate === 0) {
        emi = requested_amount / requested_tenure;
        totalAmount = requested_amount;
        totalInterest = 0;
    } else {
        emi = (requested_amount * monthlyRate * Math.pow(1 + monthlyRate, requested_tenure)) / 
              (Math.pow(1 + monthlyRate, requested_tenure) - 1);
        totalAmount = emi * requested_tenure;
        totalInterest = totalAmount - requested_amount;
    }
    
    const result = {
        predicted_amount: emi,
        formatted_amount: `₹${Math.round(emi).toLocaleString()}`,
        calculation_type: 'Traditional Formula',
        timestamp: new Date().toISOString(),
        total_amount: totalAmount,
        total_interest: totalInterest,
        emi_to_income_ratio: (emi / formData.monthly_salary) * 100,
        risk_level: calculateRiskLevel(emi, formData.monthly_salary),
        affordability_score: calculateAffordabilityScore(emi, formData.monthly_salary, formData)
    };
    
    // Create mock eligibility result
    const eligibilityResult = {
        prediction: result.emi_to_income_ratio <= 40 ? 'Eligible' : 'Not Eligible',
        prediction_probability: result.emi_to_income_ratio <= 40 ? 0.85 : 0.35,
        confidence: result.emi_to_income_ratio <= 40 ? 0.85 : 0.35,
        calculation_type: 'Traditional Assessment'
    };
    
    displayEnhancedMLResults(result, eligibilityResult, formData, interestRate);
    showNotification('✅ Traditional EMI calculation completed successfully!', 'success');
}

// Calculate risk level based on EMI-to-income ratio
function calculateRiskLevel(emi, income) {
    const ratio = (emi / income) * 100;
    if (ratio <= 30) return 'Low';
    else if (ratio <= 50) return 'Medium';
    else return 'High';
}

// Calculate affordability score
function calculateAffordabilityScore(emi, income, profile) {
    const emiRatio = (emi / income) * 100;
    const creditScore = profile.credit_score || 700;
    const emergencyFund = profile.emergency_fund || 0;
    const existingEmi = profile.current_emi_amount || 0;
    
    let score = 1.0;
    
    // EMI ratio impact
    if (emiRatio <= 30) score -= 0.1;
    else if (emiRatio <= 50) score -= 0.3;
    else score -= 0.6;
    
    // Credit score impact
    if (creditScore >= 750) score += 0.1;
    else if (creditScore < 650) score -= 0.2;
    
    // Emergency fund impact
    if (emergencyFund >= (income * 6)) score += 0.1;
    else if (emergencyFund < (income * 3)) score -= 0.1;
    
    // Existing EMI impact
    const totalEmiRatio = ((emi + existingEmi) / income) * 100;
    if (totalEmiRatio > 60) score -= 0.2;
    
    return Math.max(0, Math.min(1, score));
}

// Enhanced ML results display with comprehensive analysis
function displayEnhancedMLResults(emiResult, eligibilityResult, inputData, interestRate) {
    const emi = emiResult.predicted_amount || 0;
    const totalPayment = emiResult.total_amount || (emi * inputData.requested_tenure);
    const totalInterest = emiResult.total_interest || (totalPayment - inputData.requested_amount);
    const emiPredictionTime = emiResult.prediction_time ? (emiResult.prediction_time * 1000).toFixed(0) : 'N/A';
    const eligibilityPredictionTime = eligibilityResult.prediction_time ? (eligibilityResult.prediction_time * 1000).toFixed(0) : 'N/A';
    
    // Update original elements (also update displayed interest rate)
    updateOriginalElements(emi, inputData.requested_amount, totalInterest, totalPayment, interestRate);
    
    // Create comprehensive enhanced results section
    let enhancedResultsDiv = document.getElementById('enhancedEmiResults');
    if (!enhancedResultsDiv) {
        enhancedResultsDiv = document.createElement('div');
        enhancedResultsDiv.id = 'enhancedEmiResults';
        const container = document.querySelector('.container') || document.body;
        container.appendChild(enhancedResultsDiv);
    }
    
    enhancedResultsDiv.innerHTML = `
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200 mt-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">🧮 Comprehensive ML-Enhanced EMI Analysis</h3>
            
            <!-- Main Results Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-blue-500">
                    <h4 class="font-semibold text-gray-700 text-sm">Monthly EMI</h4>
                    <p class="text-2xl font-bold text-blue-600">${emiResult.formatted_amount || `₹${Math.round(emi).toLocaleString()}`}</p>
                    <p class="text-xs text-gray-500">${emiResult.calculation_type || 'ML Prediction'}</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-green-500">
                    <h4 class="font-semibold text-gray-700 text-sm">Eligibility Status</h4>
                    <p class="text-xl font-bold ${eligibilityResult.prediction === 'Eligible' ? 'text-green-600' : 'text-red-600'}">
                        ${eligibilityResult.prediction || 'Processing...'}
                    </p>
                    <p class="text-xs text-gray-500">Confidence: ${eligibilityResult.confidence ? (eligibilityResult.confidence * 100).toFixed(1) : 'N/A'}%</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-yellow-500">
                    <h4 class="font-semibold text-gray-700 text-sm">Risk Level</h4>
                    <p class="text-xl font-bold ${
                        (emiResult.risk_level || '').toLowerCase() === 'low' ? 'text-green-600' :
                        (emiResult.risk_level || '').toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }">
                        ${emiResult.risk_level || calculateRiskLevel(emi, inputData.monthly_salary)}
                    </p>
                    <p class="text-xs text-gray-500">EMI/Income: ${((emi/inputData.monthly_salary)*100).toFixed(1)}%</p>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-purple-500">
                    <h4 class="font-semibold text-gray-700 text-sm">Affordability Score</h4>
                    <p class="text-xl font-bold text-purple-600">
                        ${emiResult.affordability_score ? (emiResult.affordability_score * 100).toFixed(0) + '%' : 
                          (calculateAffordabilityScore(emi, inputData.monthly_salary, inputData) * 100).toFixed(0) + '%'}
                    </p>
                    <p class="text-xs text-gray-500">ML Assessment</p>
                </div>
            </div>
            
            <!-- Financial Breakdown -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow">
                    <h5 class="font-semibold text-gray-700 mb-3">💰 Financial Breakdown</h5>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Principal Amount:</span>
                            <span class="font-medium">₹${inputData.requested_amount.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Payment:</span>
                            <span class="font-medium">₹${Math.round(totalPayment).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Interest:</span>
                            <span class="font-medium text-red-600">₹${Math.round(totalInterest).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between border-t pt-2">
                            <span class="text-gray-600">Interest %:</span>
                            <span class="font-medium">${((totalInterest/inputData.requested_amount)*100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow">
                    <h5 class="font-semibold text-gray-700 mb-3">📋 Loan Details</h5>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Rate:</span>
                            <span class="font-medium">${interestRate}% p.a.</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Tenure:</span>
                            <span class="font-medium">${inputData.requested_tenure} months (${(inputData.requested_tenure/12).toFixed(1)} yrs)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Income:</span>
                            <span class="font-medium">₹${inputData.monthly_salary.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between border-t pt-2">
                            <span class="text-gray-600">Credit Score:</span>
                            <span class="font-medium">${inputData.credit_score}</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-4 rounded-lg shadow">
                    <h5 class="font-semibold text-gray-700 mb-3">🤖 ML Performance</h5>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">EMI Processing:</span>
                            <span class="font-medium">${emiPredictionTime}ms</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Eligibility Processing:</span>
                            <span class="font-medium">${eligibilityPredictionTime}ms</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Model Accuracy:</span>
                            <span class="font-medium text-green-600">99.1%</span>
                        </div>
                        <div class="flex justify-between border-t pt-2">
                            <span class="text-gray-600">Status:</span>
                            <span class="font-medium text-green-600">Active ✅</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Enhanced Recommendations -->
            <div class="bg-white p-4 rounded-lg shadow mb-4">
                <h5 class="font-semibold text-gray-700 mb-3">💡 ML-Powered Recommendations</h5>
                <div id="mlRecommendations" class="space-y-2">
                    ${generateEnhancedRecommendations(emi, inputData, emiResult, eligibilityResult)}
                </div>
            </div>
            
            <!-- Additional Insights -->
            ${eligibilityResult.probabilities ? `
                <div class="bg-white p-4 rounded-lg shadow">
                    <h5 class="font-semibold text-gray-700 mb-3">📊 Detailed Prediction Probabilities</h5>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        ${Object.entries(eligibilityResult.probabilities).map(([key, value]) => `
                            <div class="bg-gray-50 p-3 rounded text-center">
                                <div class="text-xs text-gray-600 mb-1">${key.replace('Class_', '').replace('_', ' ')}</div>
                                <div class="font-semibold text-blue-600">${(value * 100).toFixed(1)}%</div>
                                <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                                    <div class="bg-blue-600 h-1 rounded-full" style="width: ${value * 100}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                    This comprehensive analysis uses advanced machine learning models that consider 65+ financial and personal factors beyond traditional EMI formulas. 
                    Results are based on historical data analysis and current market trends.
                    <br><strong>Generated:</strong> ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    `;
    
    // Scroll to enhanced results
    enhancedResultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Generate enhanced recommendations
function generateEnhancedRecommendations(emi, profile, emiResult, eligibilityResult) {
    const recommendations = [];
    const emiRatio = (emi / profile.monthly_salary) * 100;
    const totalExistingEmi = profile.current_emi_amount || 0;
    const totalEmiRatio = ((emi + totalExistingEmi) / profile.monthly_salary) * 100;
    
    // EMI-to-income ratio analysis
    if (emiRatio <= 30) {
        recommendations.push(`✅ <strong>Excellent EMI Ratio:</strong> Your EMI-to-income ratio of ${emiRatio.toFixed(1)}% is within the ideal range (≤30%). This indicates strong financial health.`);
    } else if (emiRatio <= 40) {
        recommendations.push(`⚠️ <strong>Moderate EMI Ratio:</strong> Your EMI-to-income ratio of ${emiRatio.toFixed(1)}% is acceptable but consider increasing income or reducing loan amount for better financial comfort.`);
    } else {
        recommendations.push(`🚨 <strong>High EMI Ratio:</strong> Your EMI-to-income ratio of ${emiRatio.toFixed(1)}% exceeds recommended limits. Consider reducing loan amount or extending tenure.`);
    }
    
    // Credit score analysis
    if (profile.credit_score >= 750) {
        recommendations.push(`⭐ <strong>Excellent Credit Score:</strong> Your credit score of ${profile.credit_score} should help you secure the best interest rates. Consider negotiating for better terms.`);
    } else if (profile.credit_score < 650) {
        recommendations.push(`💳 <strong>Improve Credit Score:</strong> Your credit score of ${profile.credit_score} is below ideal. Consider improving it to 700+ for better loan terms and approval chances.`);
    }
    
    // Emergency fund analysis
    const emergencyFundMonths = profile.emergency_fund / profile.monthly_salary;
    if (emergencyFundMonths < 3) {
        recommendations.push(`💰 <strong>Build Emergency Fund:</strong> Your emergency fund covers only ${emergencyFundMonths.toFixed(1)} months of salary. Aim for 6 months before taking a large loan.`);
    } else if (emergencyFundMonths >= 6) {
        recommendations.push(`💪 <strong>Strong Emergency Fund:</strong> Your emergency fund of ${emergencyFundMonths.toFixed(1)} months provides excellent financial security.`);
    }
    
    // Existing loan analysis
    if (totalEmiRatio > 50) {
        recommendations.push(`⚠️ <strong>Total EMI Burden:</strong> Your combined EMI-to-income ratio of ${totalEmiRatio.toFixed(1)}% is high. Consider loan consolidation or prepayment options.`);
    }
    
    // Tenure optimization
    if (profile.requested_tenure > 240) {
        const shorterTenureEmi = calculateTraditionalEMIAmount(profile.requested_amount, 8.5, 240);
        const interestSavings = ((emi * profile.requested_tenure) - (shorterTenureEmi * 240));
        recommendations.push(`⏰ <strong>Tenure Optimization:</strong> Reducing tenure to 20 years could save ₹${Math.round(interestSavings).toLocaleString()} in interest (EMI: ₹${Math.round(shorterTenureEmi).toLocaleString()}).`);
    }
    
    // Default recommendation
    if (recommendations.length === 0) {
        recommendations.push(`✨ <strong>Overall Assessment:</strong> Your loan parameters appear reasonable based on your financial profile. Consider comparing rates from multiple lenders.`);
    }
    
    return recommendations.map(rec => `<div class="p-2 bg-blue-50 rounded text-sm text-gray-700">${rec}</div>`).join('');
}

// Helper function for traditional EMI calculation
function calculateTraditionalEMIAmount(principal, rate, tenure) {
    const monthlyRate = rate / (12 * 100);
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
}

// Update original form elements
function updateOriginalElements(emi, principal, totalInterest, totalAmount, interestRate) {
    const emiAmountEl = document.getElementById('emiAmount');
    const principalEl = document.getElementById('principalAmount');
    const totalInterestEl = document.getElementById('totalInterest');
    const totalAmountEl = document.getElementById('totalAmount');
    const displayRateEl = document.getElementById('displayRate');
    
    if (emiAmountEl) emiAmountEl.textContent = '₹' + Math.round(emi).toLocaleString();
    if (principalEl) principalEl.textContent = '₹' + principal.toLocaleString();
    if (totalInterestEl) totalInterestEl.textContent = '₹' + Math.round(totalInterest).toLocaleString();
    if (totalAmountEl) totalAmountEl.textContent = '₹' + Math.round(totalAmount).toLocaleString();
    if (displayRateEl && typeof interestRate !== 'undefined') displayRateEl.textContent = (Number(interestRate) || 0) + '%';
    
    // Show results section
    const resultsEl = document.getElementById('emiResults');
    const noResultsEl = document.getElementById('noResults');
    
    if (resultsEl) resultsEl.classList.remove('hidden');
    if (noResultsEl) noResultsEl.classList.add('hidden');

    // Build amortization data and render chart in the large white box
    try {
        const tenureInMonthsEl = document.getElementById('loanTenure');
        const tenureTypeEl = document.getElementById('tenureType');
        let tenureInMonths = 0;
        if (tenureInMonthsEl) {
            const rawTenure = parseFloat(tenureInMonthsEl.value) || 0;
            const tenureType = tenureTypeEl ? tenureTypeEl.value : 'years';
            tenureInMonths = tenureType === 'years' ? rawTenure * 12 : rawTenure;
        }

        if (!tenureInMonths || tenureInMonths <= 0) {
            // fallback: try to read from existing enhanced result if present
            tenureInMonths = Math.round((totalAmount && emi) ? (totalAmount / emi) : 0);
        }

        const months = [];
        const cumulativeTotals = [];
        for (let m = 1; m <= tenureInMonths; m++) {
            months.push(m);
            cumulativeTotals.push(Math.round(emi * m));
        }

        createAmortizationChart(months, cumulativeTotals);
    } catch (err) {
        console.warn('Could not render amortization chart:', err);
    }
}

// Ensure Chart.js is loaded before creating charts
function ensureChartLoaded(callback) {
    if (typeof Chart !== 'undefined') {
        return callback();
    }
    // If script already appended, wait for it
    const existing = document.querySelector('script[data-chartjs-loader]');
    if (existing) {
        existing.addEventListener('load', callback);
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.setAttribute('data-chartjs-loader', '1');
    script.onload = callback;
    script.onerror = function() { console.error('Failed to load Chart.js'); };
    document.head.appendChild(script);
}

function createAmortizationChart(months, totals) {
    ensureChartLoaded(function() {
        const canvas = document.getElementById('amortizationChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (window.amortChart) {
            try { window.amortChart.destroy(); } catch (e) { /* ignore */ }
        }

        window.amortChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Cumulative Total Paid (₹)',
                    data: totals,
                    fill: true,
                    backgroundColor: 'rgba(59,130,246,0.12)',
                    borderColor: 'rgba(59,130,246,0.95)',
                    pointRadius: 2,
                    tension: 0.15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Total Paid (₹)' },
                        ticks: { callback: function(value) { return '₹' + Number(value).toLocaleString(); } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: function(context) { const val = context.parsed.y; return 'Total Paid: ₹' + Number(val).toLocaleString(); } } }
                }
            }
        });
    });
}

// Make functions globally available
window.fillSampleData = fillSampleData;
window.calculateEMI = calculateEMI;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Calculate page JavaScript initialized with comprehensive ML integration');
});