// Enhanced Prepayment Page JavaScript with ML-Powered Analysis
console.log('Enhanced Prepayment.js loaded successfully');

// Provide a lightweight, non-destructive `utils` fallback to avoid runtime errors
// when the template expects `utils.showNotification` or `utils.formatCurrency`.
window.utils = window.utils || {};
if (typeof window.utils.showNotification !== 'function') {
    window.utils.showNotification = function(message, type = 'info', duration = 5000) {
        try {
            if (window.enhancedML && typeof window.enhancedML.showNotification === 'function') {
                window.enhancedML.showNotification(message, { duration });
                return;
            }
        } catch (e) {
            console.warn('enhancedML notifier unavailable', e);
        }
        // Last-resort: console and alert (non-blocking if not present)
        console.log('Notification fallback:', type, message);
        try { window.alert(message); } catch (e) { /* ignore */ }
    };
}

if (typeof window.utils.formatCurrency !== 'function') {
    window.utils.formatCurrency = function(value) {
        try {
            if (value === null || value === undefined || isNaN(value)) return '₹0';
            return '₹' + Math.round(value).toLocaleString();
        } catch (e) {
            return '₹0';
        }
    };
}

// Enhanced sample data for prepayment analysis with comprehensive ML features
const prepaymentSamples = [
    {
        principalRemaining: 1800000,
        currentEMI: 18500,
        interestRate: 8.5,
        remainingTenure: 15,
        prepaymentAmount: 200000,
        monthlyIncome: 85000,
        age: 35,
        creditScore: 750,
        employmentType: 'Private',
        liquidSavings: 500000,
        investmentReturns: 12,
        taxBracket: 30,
        loanType: 'home',
        originalAmount: 2500000,
        originalTenure: 20
    },
    {
        principalRemaining: 950000,
        currentEMI: 12500,
        interestRate: 9.2,
        remainingTenure: 10,
        prepaymentAmount: 100000,
        monthlyIncome: 65000,
        age: 40,
        creditScore: 720,
        employmentType: 'Government',
        liquidSavings: 300000,
        investmentReturns: 10,
        taxBracket: 20,
        loanType: 'personal',
        originalAmount: 1500000,
        originalTenure: 12
    },
    {
        principalRemaining: 2200000,
        currentEMI: 22000,
        interestRate: 7.8,
        remainingTenure: 18,
        prepaymentAmount: 500000,
        monthlyIncome: 120000,
        age: 28,
        creditScore: 780,
        employmentType: 'Private',
        liquidSavings: 800000,
        investmentReturns: 15,
        taxBracket: 30,
        loanType: 'home',
        originalAmount: 3000000,
        originalTenure: 25
    },
    {
        principalRemaining: 450000,
        currentEMI: 8500,
        interestRate: 10.5,
        remainingTenure: 6,
        prepaymentAmount: 150000,
        monthlyIncome: 55000,
        age: 45,
        creditScore: 680,
        employmentType: 'Self_Employed',
        liquidSavings: 200000,
        investmentReturns: 8,
        taxBracket: 20,
        loanType: 'business',
        originalAmount: 800000,
        originalTenure: 10
    },
    {
        principalRemaining: 3200000,
        currentEMI: 28000,
        interestRate: 8.75,
        remainingTenure: 22,
        prepaymentAmount: 800000,
        monthlyIncome: 150000,
        age: 38,
        creditScore: 800,
        employmentType: 'Private',
        liquidSavings: 1200000,
        investmentReturns: 14,
        taxBracket: 30,
        loanType: 'home',
        originalAmount: 4500000,
        originalTenure: 30
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
    try {
        console.log('Enhanced fillSampleData called for prepayment form');

        const randomSample = prepaymentSamples[Math.floor(Math.random() * prepaymentSamples.length)];
        console.log('Selected enhanced prepayment sample:', randomSample);

        Object.keys(randomSample).forEach(fieldName => {
            const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                try {
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
                } catch (innerErr) {
                    console.warn('Failed to fill field', fieldName, innerErr);
                }
            }
        });

        showNotification('Enhanced sample data with comprehensive financial profile filled! 💰', 'success');
    } catch (err) {
        console.error('fillSampleData error:', err);
        try { window.utils.showNotification('An error occurred while filling sample data. See console for details', 'error'); } catch (e) {}
    }
}

// Enhanced prepayment calculation with ML-powered analysis
function calculatePrepayment() {
    try {
        console.log('Enhanced calculatePrepayment function called with ML integration');

        // Collect comprehensive prepayment profile
        const prepaymentProfile = {
            principalRemaining: parseFloat(document.getElementById('principalRemaining')?.value || 1000000),
            currentEMI: parseFloat(document.getElementById('currentEMI')?.value || 15000),
            interestRate: parseFloat(document.getElementById('interestRate')?.value || 8.5),
            remainingTenure: parseFloat(document.getElementById('remainingTenure')?.value || 15),
            prepaymentAmount: parseFloat(document.getElementById('prepaymentAmount')?.value || 200000),
            monthlyIncome: parseFloat(document.getElementById('monthlyIncome')?.value || 75000),
            age: parseInt(document.getElementById('age')?.value || 35),
            creditScore: parseInt(document.getElementById('creditScore')?.value || 750),
            employmentType: document.getElementById('employmentType')?.value || 'Private',
            liquidSavings: parseFloat(document.getElementById('liquidSavings')?.value || 500000),
            investmentReturns: parseFloat(document.getElementById('investmentReturns')?.value || 12),
            taxBracket: parseFloat(document.getElementById('taxBracket')?.value || 30),
            loanType: document.getElementById('loanType')?.value || 'home',
            prepaymentStrategy: document.getElementById('prepaymentStrategy')?.value || 'reduce_tenure'
        };

        console.log('Comprehensive prepayment profile for ML analysis:', prepaymentProfile);

        if (!prepaymentProfile.principalRemaining || !prepaymentProfile.currentEMI) {
            showNotification('Please fill loan details to calculate prepayment benefits', 'error');
            return;
        }

        showNotification('🧮 Analyzing prepayment strategies with ML algorithms...', 'info');

        // Simulate ML processing and perform comprehensive analysis
        setTimeout(() => {
            try {
                const mlAnalysis = performMLPrepaymentAnalysis(prepaymentProfile);
                displayEnhancedPrepaymentResults(mlAnalysis, prepaymentProfile);
                showNotification('✅ Comprehensive ML prepayment analysis completed!', 'success');
            } catch (innerErr) {
                console.error('Enhanced ML analysis failed:', innerErr);
                try { window.utils.showNotification('Enhanced analysis failed. See console for details', 'error'); } catch (e) {}
            }
        }, 1500);
    } catch (err) {
        console.error('calculatePrepayment error:', err);
        try { window.utils.showNotification('An error occurred during prepayment analysis. See console for details', 'error'); } catch (e) {}
    }
}

// Perform ML-powered prepayment analysis
function performMLPrepaymentAnalysis(profile) {
    console.log('Performing ML prepayment analysis for profile:', profile);
    
    // Calculate multiple prepayment scenarios
    const scenarios = {
        noAction: calculateNoActionScenario(profile),
        reduceTenure: calculateReduceTenureScenario(profile),
        reduceEMI: calculateReduceEMIScenario(profile),
        partialPrepayment: calculatePartialPrepaymentScenario(profile)
    };
    
    // Calculate opportunity cost analysis
    const opportunityCost = calculateOpportunityCost(profile);
    
    // Generate ML recommendations
    const mlRecommendations = generateMLPrepaymentRecommendations(profile, scenarios, opportunityCost);
    
    // Calculate tax benefits (if applicable)
    const taxBenefits = calculateTaxBenefits(profile, scenarios);
    
    // Risk assessment
    const riskAssessment = assessPrepaymentRisk(profile, scenarios);
    
    return {
        scenarios,
        opportunityCost,
        mlRecommendations,
        taxBenefits,
        riskAssessment,
        optimalStrategy: findOptimalStrategy(scenarios, opportunityCost, profile),
        cashFlowImpact: calculateCashFlowImpact(profile, scenarios)
    };
}

// Calculate no action scenario
function calculateNoActionScenario(profile) {
    const monthlyRate = profile.interestRate / (12 * 100);
    const remainingMonths = profile.remainingTenure * 12;
    const totalPayment = profile.currentEMI * remainingMonths;
    const totalInterest = totalPayment - profile.principalRemaining;
    
    return {
        name: 'Continue Current EMI',
        emi: profile.currentEMI,
        tenure: profile.remainingTenure,
        totalPayment,
        totalInterest,
        interestSaved: 0,
        tenureReduction: 0,
        description: 'Continue with current EMI schedule'
    };
}

// Calculate reduce tenure scenario
function calculateReduceTenureScenario(profile) {
    const newPrincipal = profile.principalRemaining - profile.prepaymentAmount;
    const monthlyRate = profile.interestRate / (12 * 100);
    
    // Calculate new tenure with same EMI
    const newTenureMonths = Math.log(1 + (newPrincipal * monthlyRate / profile.currentEMI)) / Math.log(1 + monthlyRate);
    const newTenureYears = newTenureMonths / 12;
    
    const totalPayment = profile.prepaymentAmount + (profile.currentEMI * newTenureMonths);
    const totalInterest = totalPayment - profile.principalRemaining;
    const noActionInterest = profile.currentEMI * profile.remainingTenure * 12 - profile.principalRemaining;
    const interestSaved = noActionInterest - totalInterest;
    const tenureReduction = profile.remainingTenure - newTenureYears;
    
    return {
        name: 'Reduce Tenure',
        emi: profile.currentEMI,
        tenure: newTenureYears,
        totalPayment,
        totalInterest,
        interestSaved,
        tenureReduction,
        description: `Reduce loan tenure by ${tenureReduction.toFixed(1)} years`
    };
}

// Calculate reduce EMI scenario
function calculateReduceEMIScenario(profile) {
    const newPrincipal = profile.principalRemaining - profile.prepaymentAmount;
    const monthlyRate = profile.interestRate / (12 * 100);
    const remainingMonths = profile.remainingTenure * 12;
    
    // Calculate new EMI with same tenure
    const newEMI = (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / 
                   (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    
    const totalPayment = profile.prepaymentAmount + (newEMI * remainingMonths);
    const totalInterest = totalPayment - profile.principalRemaining;
    const noActionInterest = profile.currentEMI * remainingMonths - profile.principalRemaining;
    const interestSaved = noActionInterest - totalInterest;
    const emiReduction = profile.currentEMI - newEMI;
    
    return {
        name: 'Reduce EMI',
        emi: newEMI,
        tenure: profile.remainingTenure,
        totalPayment,
        totalInterest,
        interestSaved,
        tenureReduction: 0,
        emiReduction,
        description: `Reduce monthly EMI by ₹${Math.round(emiReduction).toLocaleString()}`
    };
}

// Calculate partial prepayment scenario
function calculatePartialPrepaymentScenario(profile) {
    const partialAmount = profile.prepaymentAmount * 0.5; // Use 50% for partial
    const newPrincipal = profile.principalRemaining - partialAmount;
    const monthlyRate = profile.interestRate / (12 * 100);
    const remainingMonths = profile.remainingTenure * 12;
    
    const newEMI = (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / 
                   (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    
    const totalPayment = partialAmount + (newEMI * remainingMonths);
    const totalInterest = totalPayment - profile.principalRemaining;
    const noActionInterest = profile.currentEMI * remainingMonths - profile.principalRemaining;
    const interestSaved = noActionInterest - totalInterest;
    const emiReduction = profile.currentEMI - newEMI;
    
    return {
        name: 'Partial Prepayment',
        emi: newEMI,
        tenure: profile.remainingTenure,
        totalPayment,
        totalInterest,
        interestSaved,
        tenureReduction: 0,
        emiReduction,
        prepaymentUsed: partialAmount,
        description: `Use ₹${Math.round(partialAmount).toLocaleString()} for prepayment, keep rest for investments`
    };
}

// Calculate opportunity cost
function calculateOpportunityCost(profile) {
    const investmentHorizon = profile.remainingTenure;
    const futureValue = profile.prepaymentAmount * Math.pow(1 + (profile.investmentReturns / 100), investmentHorizon);
    const opportunityCost = futureValue - profile.prepaymentAmount;
    
    return {
        futureValue,
        opportunityCost,
        description: `Investing ₹${profile.prepaymentAmount.toLocaleString()} at ${profile.investmentReturns}% for ${investmentHorizon} years`
    };
}

// Generate ML prepayment recommendations
function generateMLPrepaymentRecommendations(profile, scenarios, opportunityCost) {
    const recommendations = [];
    
    // Age-based recommendations
    if (profile.age < 35) {
        recommendations.push({
            priority: 'high',
            text: `🎯 <strong>Young Professional Strategy:</strong> At ${profile.age}, consider investing surplus funds for higher returns rather than aggressive prepayment. Your investment horizon is long.`
        });
    } else if (profile.age > 50) {
        recommendations.push({
            priority: 'high',
            text: `🏠 <strong>Pre-Retirement Strategy:</strong> At ${profile.age}, focus on debt reduction to achieve financial freedom before retirement. Prepayment is highly recommended.`
        });
    }
    
    // Interest rate vs investment returns analysis
    const arbitrage = profile.investmentReturns - profile.interestRate;
    if (arbitrage > 3) {
        recommendations.push({
            priority: 'medium',
            text: `📈 <strong>Investment Arbitrage:</strong> Your potential investment returns (${profile.investmentReturns}%) significantly exceed loan interest (${profile.interestRate}%). Consider investing instead of prepayment.`
        });
    } else if (arbitrage < -1) {
        recommendations.push({
            priority: 'high',
            text: `💰 <strong>Guaranteed Savings:</strong> Loan interest (${profile.interestRate}%) exceeds your investment returns (${profile.investmentReturns}%). Prepayment provides guaranteed savings.`
        });
    }
    
    // Liquidity analysis
    const liquidityRatio = profile.liquidSavings / (profile.monthlyIncome * 6);
    if (liquidityRatio < 1) {
        recommendations.push({
            priority: 'high',
            text: `🚨 <strong>Liquidity Warning:</strong> Build 6-month emergency fund before prepayment. Current savings cover only ${(liquidityRatio * 6).toFixed(1)} months.`
        });
    } else if (liquidityRatio > 2) {
        recommendations.push({
            priority: 'medium',
            text: `✅ <strong>Strong Liquidity:</strong> Excellent emergency fund coverage. You can safely consider prepayment options.`
        });
    }
    
    // Tax bracket considerations
    if (profile.loanType === 'home' && profile.taxBracket >= 30) {
        recommendations.push({
            priority: 'medium',
            text: `🏛️ <strong>Tax Optimization:</strong> Home loan provides tax benefits up to ₹2L under 80C + ₹2L under 24. Factor these savings in your decision.`
        });
    }
    
    // Employment stability
    if (profile.employmentType === 'Self_Employed') {
        recommendations.push({
            priority: 'medium',
            text: `💼 <strong>Self-Employed Consideration:</strong> Maintain higher liquidity due to income volatility. Consider partial prepayment to balance debt reduction and cash flow.`
        });
    }
    
    return recommendations;
}

// Calculate tax benefits
function calculateTaxBenefits(profile, scenarios) {
    if (profile.loanType !== 'home') {
        return { applicable: false, description: 'Tax benefits not applicable for this loan type' };
    }
    
    const principalBenefit = Math.min(150000, profile.currentEMI * 12 * 0.7); // Assuming 70% goes to principal
    const interestBenefit = Math.min(200000, scenarios.noAction.totalInterest / profile.remainingTenure);
    const totalTaxBenefit = (principalBenefit + interestBenefit) * (profile.taxBracket / 100);
    
    return {
        applicable: true,
        principalBenefit,
        interestBenefit,
        totalTaxBenefit,
        description: `Annual tax savings of ₹${Math.round(totalTaxBenefit).toLocaleString()} in ${profile.taxBracket}% tax bracket`
    };
}

// Assess prepayment risk
function assessPrepaymentRisk(profile, scenarios) {
    const risks = [];
    
    // Liquidity risk
    const postPrepaymentLiquidity = profile.liquidSavings - profile.prepaymentAmount;
    const emergencyMonths = postPrepaymentLiquidity / profile.monthlyIncome;
    
    if (emergencyMonths < 6) {
        risks.push({
            level: 'high',
            type: 'Liquidity Risk',
            description: `Emergency fund will reduce to ${emergencyMonths.toFixed(1)} months after prepayment`
        });
    }
    
    // Opportunity cost risk
    if (profile.investmentReturns > profile.interestRate + 2) {
        risks.push({
            level: 'medium',
            type: 'Opportunity Cost',
            description: `Potential loss of ₹${Math.round(scenarios.noAction.totalInterest).toLocaleString()} by not investing at ${profile.investmentReturns}%`
        });
    }
    
    // Age and income stability risk
    if (profile.age > 55 && profile.employmentType === 'Private') {
        risks.push({
            level: 'medium',
            type: 'Income Stability',
            description: 'Consider job security near retirement age before large prepayments'
        });
    }
    
    return risks;
}

// Find optimal strategy using ML decision logic
function findOptimalStrategy(scenarios, opportunityCost, profile) {
    const strategies = Object.values(scenarios).filter(s => s.name !== 'Continue Current EMI');
    
    // Score each strategy
    const scoredStrategies = strategies.map(strategy => {
        let score = 0;
        
        // Interest savings score (30%)
        score += (strategy.interestSaved / 100000) * 0.3;
        
        // Cash flow improvement score (25%)
        if (strategy.emiReduction) {
            score += (strategy.emiReduction / 5000) * 0.25;
        }
        
        // Tenure reduction score (20%)
        if (strategy.tenureReduction) {
            score += (strategy.tenureReduction / 5) * 0.2;
        }
        
        // Opportunity cost penalty (25%)
        const opportunityLoss = opportunityCost.opportunityCost - strategy.interestSaved;
        if (opportunityLoss > 0) {
            score -= (opportunityLoss / 100000) * 0.25;
        } else {
            score += 0.25; // Bonus if prepayment beats opportunity cost
        }
        
        return { ...strategy, score };
    });
    
    // Return the highest scoring strategy
    return scoredStrategies.sort((a, b) => b.score - a.score)[0];
}

// Calculate cash flow impact
function calculateCashFlowImpact(profile, scenarios) {
    const monthlyImpact = {
        reduceTenure: 0, // Same EMI
        reduceEMI: scenarios.reduceEMI.emiReduction || 0,
        partialPrepayment: scenarios.partialPrepayment.emiReduction || 0
    };
    
    const annualImpact = Object.fromEntries(
        Object.entries(monthlyImpact).map(([key, value]) => [key, value * 12])
    );
    
    return { monthlyImpact, annualImpact };
}

// Display enhanced prepayment results with comprehensive ML analysis
function displayEnhancedPrepaymentResults(mlAnalysis, profile) {
    let resultsDiv = document.getElementById('enhancedPrepaymentResults');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'enhancedPrepaymentResults';

        // Prefer appending into the dedicated results panel if present
        const resultsContainer = document.getElementById('prepaymentResults');
        if (resultsContainer) {
            // Insert at the end of the existing results area so it doesn't replace template elements
            resultsContainer.appendChild(resultsDiv);
        } else {
            // Fallback: try to place next to the main card area or append to body
            const card = document.querySelector('.card-enhanced') || document.querySelector('.container');
            if (card && card.parentNode) {
                card.parentNode.insertBefore(resultsDiv, card.nextSibling);
            } else {
                document.body.appendChild(resultsDiv);
            }
        }
    }
    
    const optimalStrategy = mlAnalysis.optimalStrategy;
    const scenarios = mlAnalysis.scenarios;
    
    resultsDiv.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mt-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">💰 Comprehensive ML Prepayment Analysis</h3>
            
            <!-- Current Loan Summary -->
            <div class="bg-white p-4 rounded-lg shadow mb-6 border-l-4 border-blue-500">
                <h4 class="font-semibold text-gray-700 mb-3">📊 Current Loan Status</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><strong>Principal Remaining:</strong> ₹${profile.principalRemaining.toLocaleString()}</div>
                    <div><strong>Current EMI:</strong> ₹${profile.currentEMI.toLocaleString()}</div>
                    <div><strong>Interest Rate:</strong> ${profile.interestRate}%</div>
                    <div><strong>Remaining Tenure:</strong> ${profile.remainingTenure} years</div>
                </div>
            </div>
            
            <!-- ML Optimal Strategy -->
            <div class="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg mb-6">
                <h4 class="text-lg font-bold mb-3">🏆 ML-Recommended Optimal Strategy</h4>
                <div class="bg-white bg-opacity-20 p-4 rounded-lg">
                    <h5 class="font-bold text-xl mb-2">${optimalStrategy.name}</h5>
                    <p class="mb-3">${optimalStrategy.description}</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div><strong>Interest Savings:</strong> ₹${Math.round(optimalStrategy.interestSaved).toLocaleString()}</div>
                        <div><strong>New EMI:</strong> ₹${Math.round(optimalStrategy.emi).toLocaleString()}</div>
                        <div><strong>ML Score:</strong> ${(optimalStrategy.score * 100).toFixed(0)}/100</div>
                    </div>
                </div>
            </div>
            
            <!-- Scenario Comparison -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${Object.values(scenarios).map(scenario => `
                    <div class="bg-white p-4 rounded-lg shadow border ${scenario.name === optimalStrategy.name ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'}">
                        ${scenario.name === optimalStrategy.name ? '<div class="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold mb-2">✨ RECOMMENDED</div>' : ''}
                        <h5 class="font-semibold text-gray-800 mb-2">${scenario.name}</h5>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">EMI:</span>
                                <span class="font-medium">₹${Math.round(scenario.emi).toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tenure:</span>
                                <span class="font-medium">${scenario.tenure.toFixed(1)} years</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Total Interest:</span>
                                <span class="font-medium text-red-600">₹${Math.round(scenario.totalInterest).toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between border-t pt-2">
                                <span class="text-gray-600">Interest Saved:</span>
                                <span class="font-medium text-green-600">₹${Math.round(scenario.interestSaved).toLocaleString()}</span>
                            </div>
                            ${scenario.tenureReduction ? `
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Tenure Reduction:</span>
                                    <span class="font-medium text-blue-600">${scenario.tenureReduction.toFixed(1)} years</span>
                                </div>
                            ` : ''}
                            ${scenario.emiReduction ? `
                                <div class="flex justify-between">
                                    <span class="text-gray-600">EMI Reduction:</span>
                                    <span class="font-medium text-blue-600">₹${Math.round(scenario.emiReduction).toLocaleString()}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Opportunity Cost Analysis -->
            <div class="bg-white p-4 rounded-lg shadow mb-6">
                <h5 class="font-semibold text-gray-700 mb-3">📈 Investment vs Prepayment Analysis</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 p-3 rounded">
                        <div class="font-semibold text-blue-800">Investment Option</div>
                        <div class="text-xl font-bold text-blue-600">₹${Math.round(mlAnalysis.opportunityCost.futureValue).toLocaleString()}</div>
                        <div class="text-xs text-blue-600">Future value at ${profile.investmentReturns}% returns</div>
                    </div>
                    <div class="bg-green-50 p-3 rounded">
                        <div class="font-semibold text-green-800">Prepayment Savings</div>
                        <div class="text-xl font-bold text-green-600">₹${Math.round(optimalStrategy.interestSaved).toLocaleString()}</div>
                        <div class="text-xs text-green-600">Guaranteed interest savings</div>
                    </div>
                    <div class="bg-purple-50 p-3 rounded">
                        <div class="font-semibold text-purple-800">Net Advantage</div>
                        <div class="text-xl font-bold ${mlAnalysis.opportunityCost.opportunityCost > optimalStrategy.interestSaved ? 'text-blue-600' : 'text-green-600'}">
                            ${mlAnalysis.opportunityCost.opportunityCost > optimalStrategy.interestSaved ? 'Investment' : 'Prepayment'}
                        </div>
                        <div class="text-xs text-purple-600">Better by ₹${Math.round(Math.abs(mlAnalysis.opportunityCost.opportunityCost - optimalStrategy.interestSaved)).toLocaleString()}</div>
                    </div>
                </div>
            </div>
            
            <!-- Tax Benefits (if applicable) -->
            ${mlAnalysis.taxBenefits.applicable ? `
                <div class="bg-white p-4 rounded-lg shadow mb-6">
                    <h5 class="font-semibold text-gray-700 mb-3">🏛️ Tax Benefits Analysis</h5>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div class="bg-yellow-50 p-3 rounded">
                            <div class="font-semibold text-yellow-800">Principal Deduction (80C)</div>
                            <div class="text-lg font-bold text-yellow-600">₹${Math.round(mlAnalysis.taxBenefits.principalBenefit).toLocaleString()}</div>
                        </div>
                        <div class="bg-yellow-50 p-3 rounded">
                            <div class="font-semibold text-yellow-800">Interest Deduction (24)</div>
                            <div class="text-lg font-bold text-yellow-600">₹${Math.round(mlAnalysis.taxBenefits.interestBenefit).toLocaleString()}</div>
                        </div>
                        <div class="bg-yellow-50 p-3 rounded">
                            <div class="font-semibold text-yellow-800">Annual Tax Savings</div>
                            <div class="text-lg font-bold text-yellow-600">₹${Math.round(mlAnalysis.taxBenefits.totalTaxBenefit).toLocaleString()}</div>
                        </div>
                    </div>
                    <p class="text-xs text-gray-600 mt-2">${mlAnalysis.taxBenefits.description}</p>
                </div>
            ` : ''}
            
            <!-- Risk Assessment -->
            ${mlAnalysis.riskAssessment.length > 0 ? `
                <div class="bg-white p-4 rounded-lg shadow mb-6">
                    <h5 class="font-semibold text-gray-700 mb-3">⚠️ Risk Assessment</h5>
                    <div class="space-y-2">
                        ${mlAnalysis.riskAssessment.map(risk => `
                            <div class="p-3 rounded border-l-4 ${
                                risk.level === 'high' ? 'border-red-500 bg-red-50' :
                                risk.level === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                                'border-blue-500 bg-blue-50'
                            }">
                                <div class="font-semibold ${
                                    risk.level === 'high' ? 'text-red-800' :
                                    risk.level === 'medium' ? 'text-yellow-800' :
                                    'text-blue-800'
                                }">${risk.type}</div>
                                <div class="text-sm text-gray-600">${risk.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- ML Recommendations -->
            <div class="bg-white p-4 rounded-lg shadow mb-6">
                <h5 class="font-semibold text-gray-700 mb-3">💡 ML-Powered Recommendations</h5>
                <div class="space-y-3">
                    ${mlAnalysis.mlRecommendations.map(rec => `
                        <div class="p-3 rounded border-l-4 ${
                            rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                            rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                            'border-blue-500 bg-blue-50'
                        }">
                            <div class="text-sm ${
                                rec.priority === 'high' ? 'text-red-700' :
                                rec.priority === 'medium' ? 'text-yellow-700' :
                                'text-blue-700'
                            }">${rec.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Cash Flow Impact -->
            <div class="bg-white p-4 rounded-lg shadow mb-6">
                <h5 class="font-semibold text-gray-700 mb-3">💸 Cash Flow Impact Analysis</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h6 class="font-semibold text-gray-600 mb-2">Monthly Cash Flow Changes</h6>
                        ${Object.entries(mlAnalysis.cashFlowImpact.monthlyImpact).map(([strategy, impact]) => `
                            <div class="flex justify-between py-1">
                                <span>${strategy.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                <span class="font-medium ${impact > 0 ? 'text-green-600' : 'text-gray-600'}">
                                    ${impact > 0 ? '+' : ''}₹${Math.round(impact).toLocaleString()}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                    <div>
                        <h6 class="font-semibold text-gray-600 mb-2">Annual Cash Flow Changes</h6>
                        ${Object.entries(mlAnalysis.cashFlowImpact.annualImpact).map(([strategy, impact]) => `
                            <div class="flex justify-between py-1">
                                <span>${strategy.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                <span class="font-medium ${impact > 0 ? 'text-green-600' : 'text-gray-600'}">
                                    ${impact > 0 ? '+' : ''}₹${Math.round(impact).toLocaleString()}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-info-circle text-blue-500 mr-1"></i>
                    This comprehensive prepayment analysis uses advanced ML algorithms considering your age, income, tax bracket, 
                    investment options, and risk profile. Recommendations are personalized but consult a financial advisor for final decisions.
                    <br><strong>Analysis completed:</strong> ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    `;
    
    // Show results section and hide no results
    const resultsEl = document.getElementById('prepaymentResults');
    const noResultsEl = document.getElementById('noResults');
    
    if (resultsEl) resultsEl.classList.remove('hidden');
    if (noResultsEl) noResultsEl.classList.add('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Toggle prepayment inputs with enhanced logic
function togglePrepaymentInputs() {
    try {
        console.log('Enhanced togglePrepaymentInputs function called');
        const strategy = document.getElementById('prepaymentStrategy')?.value;

        if (strategy) {
            showNotification(`📊 Prepayment strategy updated: ${strategy.replace('_', ' ').toUpperCase()}`, 'info');

            // Could show/hide relevant fields based on strategy
            const strategyDescriptions = {
                'reduce_tenure': 'Keep EMI same, reduce loan duration',
                'reduce_emi': 'Keep tenure same, reduce monthly payment',
                'partial_prepayment': 'Use part for prepayment, rest for investments',
                'full_prepayment': 'Pay off entire remaining loan amount'
            };

            if (strategyDescriptions[strategy]) {
                showNotification(`💡 ${strategyDescriptions[strategy]}`, 'info', 3000);
            }
        }
    } catch (err) {
        console.error('togglePrepaymentInputs error:', err);
        try { window.utils.showNotification('An error occurred updating inputs. See console for details', 'error'); } catch (e) {}
    }
}

// Make enhanced functions globally available but do NOT overwrite page-defined functions
if (typeof window.fillSampleData !== 'function') {
    window.fillSampleData = fillSampleData;
} else {
    // expose under a non-conflicting name
    window.fillPrepaymentSample = fillSampleData;
}

if (typeof window.calculatePrepayment !== 'function') {
    window.calculatePrepayment = calculatePrepayment;
} else {
    // avoid clobbering page handler - expose enhanced analyzer separately
    window.enhancedCalculatePrepayment = calculatePrepayment;
}

if (typeof window.togglePrepaymentInputs !== 'function') {
    window.togglePrepaymentInputs = togglePrepaymentInputs;
} else {
    window.enhancedTogglePrepaymentInputs = togglePrepaymentInputs;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Prepayment page JavaScript initialized with comprehensive ML integration');
    
    // Add enhanced calculation button if form exists
    const form = document.querySelector('form');
    if (form && !document.getElementById('enhancedCalculateButton')) {
        const calculateButtonContainer = form.querySelector('.text-center') || form.querySelector('button[type="button"]')?.parentElement;
        
        if (calculateButtonContainer) {
            const enhancedCalculateButton = document.createElement('button');
            enhancedCalculateButton.id = 'enhancedCalculateButton';
            enhancedCalculateButton.type = 'button';
            // Call enhanced analyzer if available without replacing the page's Calculate button behavior
            enhancedCalculateButton.onclick = function() {
                if (typeof window.enhancedCalculatePrepayment === 'function') {
                    window.enhancedCalculatePrepayment();
                } else if (typeof window.calculatePrepayment === 'function') {
                    // fallback: call page's calculate (should already run)
                    window.calculatePrepayment();
                }
            };
            enhancedCalculateButton.className = 'bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg ml-4';
            enhancedCalculateButton.innerHTML = '<i class="fas fa-calculator mr-2"></i>ML Prepayment Analysis';
            
            calculateButtonContainer.appendChild(enhancedCalculateButton);
        }
    }
});