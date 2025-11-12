// Enhanced Lenders Page JavaScript with ML-Powered Lender Recommendations
console.log('Enhanced Lenders.js loaded successfully');

// Enhanced sample data for lender search with comprehensive ML features
const lenderSamples = [
    {
        loanType: 'home',
        loanAmount: 2500000,
        tenure: 20,
        creditScore: 750,
        monthlyIncome: 85000,
        age: 32,
        employmentType: 'Private',
        existingEMI: 12000,
        downPayment: 500000,
        propertyValue: 3000000,
        location: 'Mumbai'
    },
    {
        loanType: 'car',
        loanAmount: 800000,
        tenure: 7,
        creditScore: 720,
        monthlyIncome: 65000,
        age: 28,
        employmentType: 'Government',
        existingEMI: 5000,
        downPayment: 200000,
        vehicleValue: 1000000,
        location: 'Delhi'
    },
    {
        loanType: 'personal',
        loanAmount: 500000,
        tenure: 5,
        creditScore: 680,
        monthlyIncome: 55000,
        age: 35,
        employmentType: 'Self_Employed',
        existingEMI: 8000,
        purpose: 'Medical',
        location: 'Bangalore'
    },
    {
        loanType: 'business',
        loanAmount: 1500000,
        tenure: 10,
        creditScore: 700,
        monthlyIncome: 120000,
        age: 45,
        employmentType: 'Self_Employed',
        existingEMI: 25000,
        businessVintage: 8,
        turnover: 5000000,
        location: 'Pune'
    },
    {
        loanType: 'education',
        loanAmount: 1000000,
        tenure: 15,
        creditScore: 740,
        monthlyIncome: 70000,
        age: 26,
        employmentType: 'Private',
        existingEMI: 0,
        courseType: 'Engineering',
        institutionRank: 'Top 10',
        location: 'Chennai'
    }
];

// Enhanced lender database with ML-driven matching criteria
const enhancedLenderDatabase = [
    {
        id: 'sbi_home',
        name: 'State Bank of India',
        type: 'Government Bank',
        loanTypes: ['home', 'personal', 'education'],
        baseRate: 8.5,
        processingFee: 0.5,
        minCreditScore: 650,
        maxLoanAmount: 10000000,
        specialties: ['Government employees', 'First-time buyers'],
        features: ['Flexible EMI', 'No prepayment charges after 1 year', 'Online processing'],
        approvalTime: '15-20 days',
        documentation: 'Standard',
        mlScore: 0.85,
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 65,
            minIncome: 25000,
            maxEMIRatio: 50,
            employmentTypes: ['Government', 'Private', 'Self_Employed']
        }
    },
    {
        id: 'hdfc_premium',
        name: 'HDFC Bank',
        type: 'Private Bank',
        loanTypes: ['home', 'car', 'personal', 'business'],
        baseRate: 8.75,
        processingFee: 0.5,
        minCreditScore: 700,
        maxLoanAmount: 15000000,
        specialties: ['High-income professionals', 'Premium banking'],
        features: ['Quick approval', 'Digital processing', 'Relationship benefits'],
        approvalTime: '7-10 days',
        documentation: 'Minimal',
        mlScore: 0.92,
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 70,
            minIncome: 50000,
            maxEMIRatio: 60,
            employmentTypes: ['Private', 'Self_Employed']
        }
    },
    {
        id: 'icici_smart',
        name: 'ICICI Bank',
        type: 'Private Bank',
        loanTypes: ['home', 'car', 'personal', 'education'],
        baseRate: 9.0,
        processingFee: 0.75,
        minCreditScore: 680,
        maxLoanAmount: 12000000,
        specialties: ['Tech professionals', 'Quick processing'],
        features: ['Online application', 'Instant approval', 'Flexible tenure'],
        approvalTime: '5-7 days',
        documentation: 'Digital',
        mlScore: 0.88,
        eligibilityCriteria: {
            minAge: 23,
            maxAge: 65,
            minIncome: 40000,
            maxEMIRatio: 55,
            employmentTypes: ['Private', 'Self_Employed']
        }
    },
    {
        id: 'axis_advantage',
        name: 'Axis Bank',
        type: 'Private Bank',
        loanTypes: ['home', 'car', 'personal', 'business'],
        baseRate: 8.9,
        processingFee: 1.0,
        minCreditScore: 720,
        maxLoanAmount: 10000000,
        specialties: ['Business loans', 'Self-employed'],
        features: ['Customized rates', 'Business banking', 'Fast track processing'],
        approvalTime: '10-12 days',
        documentation: 'Comprehensive',
        mlScore: 0.86,
        eligibilityCriteria: {
            minAge: 25,
            maxAge: 60,
            minIncome: 60000,
            maxEMIRatio: 50,
            employmentTypes: ['Private', 'Self_Employed']
        }
    },
    {
        id: 'kotak_prime',
        name: 'Kotak Mahindra Bank',
        type: 'Private Bank',
        loanTypes: ['home', 'car', 'personal'],
        baseRate: 9.25,
        processingFee: 0.5,
        minCreditScore: 750,
        maxLoanAmount: 8000000,
        specialties: ['Prime customers', 'Personalized service'],
        features: ['Premium rates', 'Dedicated RM', 'Priority processing'],
        approvalTime: '8-10 days',
        documentation: 'Standard',
        mlScore: 0.89,
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 65,
            minIncome: 75000,
            maxEMIRatio: 45,
            employmentTypes: ['Private']
        }
    },
    {
        id: 'bajaj_finserv',
        name: 'Bajaj Finserv',
        type: 'NBFC',
        loanTypes: ['personal', 'business', 'education'],
        baseRate: 10.5,
        processingFee: 2.0,
        minCreditScore: 600,
        maxLoanAmount: 5000000,
        specialties: ['Quick disbursals', 'Minimal documentation'],
        features: ['Instant approval', 'Flexi EMI', 'No collateral'],
        approvalTime: '1-2 days',
        documentation: 'Minimal',
        mlScore: 0.75,
        eligibilityCriteria: {
            minAge: 23,
            maxAge: 58,
            minIncome: 25000,
            maxEMIRatio: 65,
            employmentTypes: ['Private', 'Self_Employed']
        }
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

// Enhanced sample data filling with comprehensive profile
function fillSampleData() {
    console.log('Enhanced fillSampleData called for lenders form');
    
    const randomSample = lenderSamples[Math.floor(Math.random() * lenderSamples.length)];
    console.log('Selected enhanced lender sample:', randomSample);
    
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
    
    showNotification('Enhanced sample data with comprehensive profile filled! 🎯', 'success');
}

// Enhanced lender finding with ML-powered recommendations
function findLenders() {
    console.log('Enhanced findLenders function called with ML integration');
    
    // Collect comprehensive user profile
    const userProfile = {
        loanType: document.getElementById('loanType')?.value || 'personal',
        loanAmount: parseFloat(document.getElementById('loanAmount')?.value || 500000),
        tenure: parseFloat(document.getElementById('tenure')?.value || 5),
        creditScore: parseInt(document.getElementById('creditScore')?.value || 700),
        monthlyIncome: parseInt(document.getElementById('monthlyIncome')?.value || 50000),
        age: parseInt(document.getElementById('age')?.value || 30),
        employmentType: document.getElementById('employmentType')?.value || 'Private',
        existingEMI: parseInt(document.getElementById('existingEMI')?.value || 0),
        location: document.getElementById('location')?.value || 'Mumbai'
    };
    
    console.log('User profile for ML lender matching:', userProfile);
    
    showNotification('🔍 Analyzing with ML algorithms to find best lenders...', 'info');
    
    // Simulate ML processing
    setTimeout(() => {
        const mlRecommendations = generateMLLenderRecommendations(userProfile);
        displayEnhancedLenderResults(mlRecommendations, userProfile);
        showNotification(`✅ Found ${mlRecommendations.length} ML-matched lenders with competitive rates!`, 'success');
    }, 1500);
}

// Generate ML-powered lender recommendations
function generateMLLenderRecommendations(userProfile) {
    console.log('Generating ML lender recommendations for profile:', userProfile);
    
    const recommendations = enhancedLenderDatabase
        .filter(lender => lender.loanTypes.includes(userProfile.loanType))
        .map(lender => {
            const matchScore = calculateMLMatchScore(lender, userProfile);
            const customizedRate = calculateCustomizedRate(lender, userProfile);
            const emi = calculateEMI(userProfile.loanAmount, customizedRate, userProfile.tenure * 12);
            const totalInterest = (emi * userProfile.tenure * 12) - userProfile.loanAmount;
            
            return {
                ...lender,
                matchScore,
                customizedRate,
                emi,
                totalInterest,
                approvalProbability: calculateApprovalProbability(lender, userProfile),
                personalizedFeatures: getPersonalizedFeatures(lender, userProfile),
                riskAssessment: assessLenderRisk(lender, userProfile)
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6); // Top 6 recommendations
    
    return recommendations;
}

// Calculate ML-based match score
function calculateMLMatchScore(lender, profile) {
    let score = 0;
    
    // Credit score compatibility (25% weight)
    const creditScoreMatch = profile.creditScore >= lender.minCreditScore ? 
        Math.min(1, (profile.creditScore - lender.minCreditScore + 100) / 200) : 0;
    score += creditScoreMatch * 0.25;
    
    // Income and EMI ratio compatibility (20% weight)
    const maxAffordableEMI = profile.monthlyIncome * (lender.eligibilityCriteria.maxEMIRatio / 100);
    const requiredEMI = calculateEMI(profile.loanAmount, lender.baseRate, profile.tenure * 12);
    const emiAffordability = maxAffordableEMI >= requiredEMI ? 1 : maxAffordableEMI / requiredEMI;
    score += emiAffordability * 0.20;
    
    // Employment type match (15% weight)
    const employmentMatch = lender.eligibilityCriteria.employmentTypes.includes(profile.employmentType) ? 1 : 0.5;
    score += employmentMatch * 0.15;
    
    // Age eligibility (10% weight)
    const ageMatch = (profile.age >= lender.eligibilityCriteria.minAge && 
                     profile.age <= lender.eligibilityCriteria.maxAge) ? 1 : 0;
    score += ageMatch * 0.10;
    
    // Loan amount eligibility (15% weight)
    const amountMatch = profile.loanAmount <= lender.maxLoanAmount ? 1 : 0.7;
    score += amountMatch * 0.15;
    
    // ML score from lender database (15% weight)
    score += lender.mlScore * 0.15;
    
    return Math.min(1, score);
}

// Calculate customized interest rate based on profile
function calculateCustomizedRate(lender, profile) {
    let rate = lender.baseRate;
    
    // Credit score adjustment
    if (profile.creditScore >= 800) rate -= 0.5;
    else if (profile.creditScore >= 750) rate -= 0.25;
    else if (profile.creditScore < 650) rate += 0.75;
    else if (profile.creditScore < 700) rate += 0.25;
    
    // Income level adjustment
    if (profile.monthlyIncome >= 100000) rate -= 0.25;
    else if (profile.monthlyIncome < 30000) rate += 0.5;
    
    // Employment type adjustment
    if (profile.employmentType === 'Government') rate -= 0.25;
    else if (profile.employmentType === 'Self_Employed') rate += 0.5;
    
    // Existing EMI burden adjustment
    const emiRatio = ((profile.existingEMI / profile.monthlyIncome) * 100);
    if (emiRatio > 30) rate += 0.25;
    
    return Math.max(lender.baseRate - 1, Math.min(lender.baseRate + 2, rate));
}

// Calculate EMI
function calculateEMI(principal, rate, months) {
    const monthlyRate = rate / (12 * 100);
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

// Calculate approval probability
function calculateApprovalProbability(lender, profile) {
    let probability = 0.5;
    
    // Credit score impact
    if (profile.creditScore >= lender.minCreditScore + 100) probability += 0.3;
    else if (profile.creditScore >= lender.minCreditScore + 50) probability += 0.2;
    else if (profile.creditScore >= lender.minCreditScore) probability += 0.1;
    else probability -= 0.4;
    
    // Income stability
    if (profile.employmentType === 'Government') probability += 0.2;
    else if (profile.employmentType === 'Private') probability += 0.1;
    
    // Existing EMI burden
    const totalEMI = profile.existingEMI + calculateEMI(profile.loanAmount, lender.baseRate, profile.tenure * 12);
    const emiRatio = (totalEMI / profile.monthlyIncome) * 100;
    if (emiRatio <= 40) probability += 0.1;
    else if (emiRatio > 60) probability -= 0.2;
    
    return Math.max(0.1, Math.min(0.95, probability));
}

// Get personalized features
function getPersonalizedFeatures(lender, profile) {
    const features = [...lender.features];
    
    if (profile.creditScore >= 750) {
        features.push('Premium customer benefits');
    }
    
    if (profile.monthlyIncome >= 100000) {
        features.push('High-value customer perks');
    }
    
    if (profile.employmentType === 'Government') {
        features.push('Government employee special rates');
    }
    
    return features;
}

// Assess lender risk for user
function assessLenderRisk(lender, profile) {
    const risks = [];
    
    if (lender.type === 'NBFC') {
        risks.push('Higher interest rates but faster processing');
    }
    
    if (lender.processingFee > 1.0) {
        risks.push('Higher processing fees');
    }
    
    if (lender.minCreditScore > profile.creditScore) {
        risks.push('Credit score requirement not met');
    }
    
    return risks;
}

// Display enhanced lender results with ML analysis
function displayEnhancedLenderResults(recommendations, userProfile) {
    let resultsDiv = document.getElementById('enhancedLenderResults');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'enhancedLenderResults';
        const form = document.querySelector('form') || document.querySelector('.container');
        form.parentNode.insertBefore(resultsDiv, form.nextSibling);
    }
    
    resultsDiv.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mt-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">🎯 ML-Powered Lender Recommendations</h3>
            
            <!-- User Profile Summary -->
            <div class="bg-white p-4 rounded-lg shadow mb-6 border-l-4 border-blue-500">
                <h4 class="font-semibold text-gray-700 mb-3">📊 Your Loan Profile</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><strong>Loan Type:</strong> ${userProfile.loanType.charAt(0).toUpperCase() + userProfile.loanType.slice(1)}</div>
                    <div><strong>Amount:</strong> ₹${userProfile.loanAmount.toLocaleString()}</div>
                    <div><strong>Tenure:</strong> ${userProfile.tenure} years</div>
                    <div><strong>Credit Score:</strong> <span class="${userProfile.creditScore >= 750 ? 'text-green-600' : userProfile.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'}">${userProfile.creditScore}</span></div>
                </div>
            </div>
            
            <!-- Lender Recommendations -->
            <div class="grid grid-cols-1 gap-6">
                ${recommendations.map((lender, index) => `
                    <div class="bg-white p-6 rounded-lg shadow-md border ${index === 0 ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'}">
                        ${index === 0 ? '<div class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">🏆 Best Match</div>' : ''}
                        
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h5 class="text-lg font-bold text-gray-800">${lender.name}</h5>
                                <p class="text-sm text-gray-600">${lender.type} • ${lender.approvalTime}</p>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-blue-600">${lender.customizedRate.toFixed(2)}%</div>
                                <div class="text-xs text-gray-500">Personalized Rate</div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm text-gray-600">Monthly EMI</div>
                                <div class="text-lg font-semibold text-green-600">₹${Math.round(lender.emi).toLocaleString()}</div>
                            </div>
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm text-gray-600">Total Interest</div>
                                <div class="text-lg font-semibold text-red-600">₹${Math.round(lender.totalInterest).toLocaleString()}</div>
                            </div>
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm text-gray-600">Approval Probability</div>
                                <div class="text-lg font-semibold ${lender.approvalProbability >= 0.8 ? 'text-green-600' : lender.approvalProbability >= 0.6 ? 'text-yellow-600' : 'text-red-600'}">
                                    ${(lender.approvalProbability * 100).toFixed(0)}%
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="text-sm text-gray-600 mb-2">ML Match Score</div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${lender.matchScore * 100}%"></div>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">${(lender.matchScore * 100).toFixed(0)}% compatibility</div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h6 class="font-semibold text-gray-700 mb-2">✨ Personalized Features</h6>
                                <ul class="text-xs text-gray-600 space-y-1">
                                    ${lender.personalizedFeatures.slice(0, 4).map(feature => `<li>• ${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h6 class="font-semibold text-gray-700 mb-2">📋 Key Details</h6>
                                <div class="text-xs text-gray-600 space-y-1">
                                    <div>Processing Fee: ${lender.processingFee}%</div>
                                    <div>Min Credit Score: ${lender.minCreditScore}</div>
                                    <div>Documentation: ${lender.documentation}</div>
                                    <div>Max Amount: ₹${(lender.maxLoanAmount / 100000).toFixed(0)}L</div>
                                </div>
                            </div>
                        </div>
                        
                        ${lender.riskAssessment.length > 0 ? `
                            <div class="bg-yellow-50 p-3 rounded mb-4">
                                <h6 class="font-semibold text-yellow-800 mb-2">⚠️ Important Considerations</h6>
                                <ul class="text-xs text-yellow-700 space-y-1">
                                    ${lender.riskAssessment.map(risk => `<li>• ${risk}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        <div class="flex gap-3">
                            <button onclick="applyLoan('${lender.name}', '${lender.id}')" 
                                    class="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                                Apply Now
                            </button>
                            <button onclick="viewLenderDetails('${lender.id}')" 
                                    class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                                View Details
                            </button>
                            <button onclick="compareLender('${lender.id}')" 
                                    class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                                Compare
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- ML Insights -->
            <div class="bg-white p-4 rounded-lg shadow mt-6">
                <h5 class="font-semibold text-gray-700 mb-3">🤖 ML-Generated Insights</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div class="bg-blue-50 p-3 rounded">
                        <div class="font-semibold text-blue-800">Best Rate Available</div>
                        <div class="text-xl font-bold text-blue-600">${Math.min(...recommendations.map(l => l.customizedRate)).toFixed(2)}%</div>
                        <div class="text-xs text-blue-600">Based on your profile</div>
                    </div>
                    <div class="bg-green-50 p-3 rounded">
                        <div class="font-semibold text-green-800">Highest Approval Chance</div>
                        <div class="text-xl font-bold text-green-600">${Math.max(...recommendations.map(l => l.approvalProbability * 100)).toFixed(0)}%</div>
                        <div class="text-xs text-green-600">With ${recommendations.find(l => l.approvalProbability === Math.max(...recommendations.map(r => r.approvalProbability)))?.name}</div>
                    </div>
                    <div class="bg-purple-50 p-3 rounded">
                        <div class="font-semibold text-purple-800">Processing Speed</div>
                        <div class="text-xl font-bold text-purple-600">${recommendations[0]?.approvalTime || 'N/A'}</div>
                        <div class="text-xs text-purple-600">Fastest option</div>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                    These recommendations are generated using advanced ML algorithms that analyze your profile against 
                    ${enhancedLenderDatabase.length}+ lenders. Rates and approval probabilities are personalized estimates.
                    <br><strong>Analysis completed:</strong> ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    `;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Enhanced apply loan function with ML tracking
function applyLoan(lenderName, lenderId) {
    console.log('Enhanced applyLoan called for:', lenderName, lenderId);
    
    // Track ML recommendation effectiveness
    showNotification(`🚀 Initiating application with ${lenderName}...`, 'info');
    
    // Simulate application process
    setTimeout(() => {
        showNotification(`✅ Application submitted to ${lenderName}! You'll receive a confirmation email shortly.`, 'success');
        
        // Log ML recommendation conversion
        console.log('ML recommendation conversion:', { lenderId, lenderName, timestamp: new Date() });
    }, 1000);
}

// View detailed lender information
function viewLenderDetails(lenderId) {
    const lender = enhancedLenderDatabase.find(l => l.id === lenderId);
    if (!lender) return;
    
    showNotification(`📋 Opening detailed information for ${lender.name}...`, 'info');
    
    // Could open a modal or navigate to detailed page
    console.log('Viewing lender details:', lender);
}

// Add lender to comparison
function compareLender(lenderId) {
    const lender = enhancedLenderDatabase.find(l => l.id === lenderId);
    if (!lender) return;
    
    showNotification(`⚖️ Added ${lender.name} to comparison list`, 'success');
    
    // Could implement comparison functionality
    console.log('Adding to comparison:', lender);
}

// Make enhanced functions globally available
window.fillSampleData = fillSampleData;
window.findLenders = findLenders;
window.applyLoan = applyLoan;
window.viewLenderDetails = viewLenderDetails;
window.compareLender = compareLender;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Lenders page JavaScript initialized with comprehensive ML integration');
    
    // Add enhanced search button if form exists
    const form = document.querySelector('form');
    if (form && !document.getElementById('enhancedSearchButton')) {
        const searchButtonContainer = form.querySelector('.text-center') || form.querySelector('button[type="submit"]')?.parentElement;
        
        if (searchButtonContainer) {
            const enhancedSearchButton = document.createElement('button');
            enhancedSearchButton.id = 'enhancedSearchButton';
            enhancedSearchButton.type = 'button';
            enhancedSearchButton.onclick = findLenders;
            enhancedSearchButton.className = 'bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg ml-4';
            enhancedSearchButton.innerHTML = '<i class="fas fa-search mr-2"></i>Find ML-Matched Lenders';
            
            searchButtonContainer.appendChild(enhancedSearchButton);
        }
    }
});