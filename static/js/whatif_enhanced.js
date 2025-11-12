// Enhanced What-If Analysis with ML Integration
console.log('Enhanced What-If Analysis loaded');

let currentTab = 'current';
let comparisonChart = null;

// ML API Integration Functions
async function callMLAPI(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('ML API Error:', error);
        return { error: error.message };
    }
}

// Convert form data to ML model format
function formDataToMLFormat(formData) {
    return {
        age: formData.age || 30,
        gender: formData.gender || 'Male',
        marital_status: formData.maritalStatus || 'Married',
        education: formData.education || 'Graduate',
        family_size: formData.familySize || 3,
        dependents: formData.dependents || 1,
        employment_type: formData.employmentType || 'Private',
        company_type: formData.companyType || 'MNC',
        years_of_employment: formData.yearsOfEmployment || 5,
        monthly_salary: parseFloat(formData.income) || 50000,
        credit_score: parseFloat(formData.creditScore) || 750,
        bank_balance: formData.bankBalance || 200000,
        emergency_fund: formData.emergencyFund || 100000,
        house_type: formData.houseType || 'Rented',
        monthly_rent: formData.monthlyRent || 25000,
        school_fees: formData.schoolFees || 5000,
        college_fees: formData.collegeFees || 0,
        travel_expenses: formData.travelExpenses || 5000,
        groceries_utilities: formData.groceriesUtilities || 15000,
        other_monthly_expenses: formData.otherExpenses || 5000,
        existing_loans: formData.existingLoans || 'No',
        current_emi_amount: parseFloat(formData.currentEMI) || 0,
        emi_scenario: 'New_Loan',
        requested_amount: parseFloat(formData.loanAmount) || 2000000,
        requested_tenure: (parseFloat(formData.tenure) || 20) * 12 // Convert years to months
    };
}

// Correct EMI calculation function for what-if analysis (always accurate)
function calculateCorrectWhatIfEMI(formData) {
    const principal = parseFloat(formData.loanAmount) || 1000000;
    const tenureYears = parseFloat(formData.tenure) || 10;
    const tenureMonths = tenureYears * 12;
    const defaultAnnualRate = 8.5; // 8.5% p.a. - typical rate for what-if analysis
    const monthlyRate = defaultAnnualRate / (12 * 100);
    
    let emi, totalAmount, totalInterest;
    
    if (monthlyRate === 0) {
        emi = principal / tenureMonths;
        totalAmount = principal;
        totalInterest = 0;
    } else {
        emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        totalAmount = emi * tenureMonths;
        totalInterest = totalAmount - principal;
    }
    
    const income = parseFloat(formData.income) || 50000;
    
    return {
        predicted_amount: emi,
        formatted_amount: `₹${Math.round(emi).toLocaleString()}`,
        calculation_type: 'Traditional Formula (8.5% p.a.)',
        timestamp: new Date().toISOString(),
        total_amount: totalAmount,
        total_interest: totalInterest,
        total_payment: totalAmount,
        emi_to_income_ratio: (emi / income) * 100,
        risk_level: calculateWhatIfRiskLevel(emi, income),
        affordability_score: calculateWhatIfAffordability(emi, income, formData),
        interest_rate_used: defaultAnnualRate,
        prediction_time: 0.001
    };
}

// Risk level calculation for what-if analysis
function calculateWhatIfRiskLevel(emi, income) {
    const ratio = (emi / income) * 100;
    if (ratio <= 30) return 'Low';
    if (ratio <= 40) return 'Medium';
    return 'High';
}

// Affordability score calculation for what-if analysis
function calculateWhatIfAffordability(emi, income, profile) {
    const emiRatio = (emi / income) * 100;
    const baseScore = Math.max(0, (50 - emiRatio) / 50);
    
    // Adjust based on profile factors
    let adjustedScore = baseScore;
    
    if (parseFloat(profile.creditScore) >= 750) adjustedScore += 0.1;
    if (profile.employmentType === 'Government') adjustedScore += 0.1;
    if (profile.existingLoans === 'No') adjustedScore += 0.1;
    if (profile.houseType === 'Owned') adjustedScore += 0.05;
    
    return Math.min(100, Math.max(0, adjustedScore * 100));
}

// Create fallback eligibility assessment for what-if
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

// Enhanced sample data function
function fillSampleData(type = 'whatIf') {
    console.log('Filling enhanced sample data for what-if analysis');
    
    const sampleData = {
        // Current scenario
        currentIncome: 75000,
        currentEMI: 18000,
        currentLoanAmount: 2500000,
        currentTenure: 20,
        currentRate: 8.5,
        currentCreditScore: 750,
        
        // New scenario
        newIncome: 90000,
        newEMI: 20000,
        newLoanAmount: 3000000,
        newTenure: 25,
        newRate: 7.8,
        newCreditScore: 780,
        
        // Additional profile data
        age: 32,
        gender: 'Male',
        maritalStatus: 'Married',
        education: 'Graduate',
        familySize: 4,
        dependents: 2,
        employmentType: 'Private',
        companyType: 'MNC',
        yearsOfEmployment: 8,
        bankBalance: 300000,
        emergencyFund: 150000,
        houseType: 'Rented',
        monthlyRent: 30000,
        schoolFees: 8000,
        collegeFees: 0,
        travelExpenses: 6000,
        groceriesUtilities: 18000,
        otherExpenses: 7000,
        existingLoans: 'No'
    };
    
    // Fill form fields
    Object.keys(sampleData).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.value = sampleData[fieldName];
            field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    
    showNotification('Enhanced sample data filled successfully! 🚀', 'success');
}

// Enhanced scenario analysis with ML integration
async function analyzeScenarios() {
    console.log('Starting enhanced ML-powered scenario analysis');
    
    try {
        // Show loading state
        showNotification('Analyzing scenarios with ML models...', 'info');
        document.getElementById('analysisResults').classList.add('opacity-50');
        
        // Get form data for both scenarios with proper field reading
        const currentData = {
            income: parseFloat(document.getElementById('currentIncome')?.value) || 75000,
            emi: parseFloat(document.getElementById('currentEMI')?.value) || 18000,
            loanAmount: parseFloat(document.getElementById('currentLoanAmount')?.value) || 2500000,
            tenure: parseFloat(document.getElementById('currentTenure')?.value) || 20,
            rate: parseFloat(document.getElementById('currentRate')?.value) || 8.5,
            creditScore: parseFloat(document.getElementById('currentCreditScore')?.value) || 750,
            // Additional data for ML model from form or defaults
            age: parseFloat(document.getElementById('age')?.value) || 30,
            gender: document.getElementById('gender')?.value || 'Male',
            maritalStatus: document.getElementById('maritalStatus')?.value || 'Married',
            education: 'Graduate',
            familySize: 3,
            dependents: 1,
            employmentType: 'Private',
            companyType: 'MNC',
            yearsOfEmployment: parseFloat(document.getElementById('yearsOfEmployment')?.value) || 5,
            bankBalance: parseFloat(document.getElementById('bankBalance')?.value) || 200000,
            emergencyFund: parseFloat(document.getElementById('emergencyFund')?.value) || 100000,
            houseType: 'Rented',
            monthlyRent: 25000,
            schoolFees: 5000,
            collegeFees: 0,
            travelExpenses: 5000,
            groceriesUtilities: 15000,
            otherExpenses: 5000,
            existingLoans: 'No'
        };
        
        const newData = {
            ...currentData,
            income: parseFloat(document.getElementById('newIncome')?.value) || 90000,
            emi: parseFloat(document.getElementById('newEMI')?.value) || 20000,
            loanAmount: parseFloat(document.getElementById('newLoanAmount')?.value) || 3000000,
            tenure: parseFloat(document.getElementById('newTenure')?.value) || 25,
            rate: parseFloat(document.getElementById('newRate')?.value) || 7.8,
            creditScore: parseFloat(document.getElementById('newCreditScore')?.value) || 780
        };
        
        // Debug: Log the differences
        console.log('Current Data:', currentData);
        console.log('New Data:', newData);
        console.log('Income difference:', newData.income - currentData.income);
        console.log('Loan amount difference:', newData.loanAmount - currentData.loanAmount);
        
        // Calculate correct EMI for both scenarios using MATHEMATICAL FORMULAS (NO ML)
        const currentEMIResult = calculateCorrectWhatIfEMI(currentData);
        const newEMIResult = calculateCorrectWhatIfEMI(newData);
        
        // Get eligibility predictions (ML ONLY for eligibility, NEVER for calculations)
        const [currentEligibility, newEligibility] = await Promise.all([
            callMLAPI('/api/predict_eligibility', formDataToMLFormat(currentData)).catch(() => createFallbackEligibility(currentEMIResult)),
            callMLAPI('/api/predict_eligibility', formDataToMLFormat(newData)).catch(() => createFallbackEligibility(newEMIResult))
        ]);
        
        console.log('Current EMI calculation:', currentEMIResult);
        console.log('New EMI calculation:', newEMIResult);
        console.log('Current eligibility:', currentEligibility);
        console.log('New eligibility:', newEligibility);
        
        // Debug: Check EMI differences (now using correct calculations)
        const currentEMI = currentEMIResult.predicted_amount || 0;
        const newEMI = newEMIResult.predicted_amount || 0;
        console.log('EMI Difference:', newEMI - currentEMI);
        
        // Process and display results
        await displayMLResults(currentData, newData, currentEMIResult, newEMIResult, currentEligibility, newEligibility);
        
        showNotification('Analysis completed with accurate EMI calculations! 🎯', 'success');
        
    } catch (error) {
        console.error('Analysis error:', error);
        showNotification('Error during analysis. Please try again.', 'error');
        
        // Fallback to traditional calculation
        fallbackAnalysis();
    } finally {
        document.getElementById('analysisResults').classList.remove('opacity-50');
    }
}

async function displayMLResults(currentData, newData, currentPred, newPred, currentElig, newElig) {
    // Calculate changes with hybrid ML + traditional approach
    console.log('Displaying ML results with hybrid calculation...');
    
    // Extract predicted amounts with enhanced fallback
    let currentEMI = 0;
    let newEMI = 0;
    
    // Try ML predictions first, fall back to traditional if needed
    if (currentPred && !currentPred.error && currentPred.predicted_amount > 0) {
        currentEMI = currentPred.predicted_amount;
    } else {
        console.warn('Using traditional calculation for current scenario');
        currentEMI = calculateTraditionalEMI(currentData.loanAmount, currentData.rate, currentData.tenure);
    }
    
    if (newPred && !newPred.error && newPred.predicted_amount > 0) {
        newEMI = newPred.predicted_amount;
    } else {
        console.warn('Using traditional calculation for new scenario');
        newEMI = calculateTraditionalEMI(newData.loanAmount, newData.rate, newData.tenure);
    }
    
    // If ML predictions are too similar (less than 1% difference), use traditional calculations
    const mlDifference = Math.abs(newEMI - currentEMI);
    const mlDifferencePercent = currentEMI > 0 ? (mlDifference / currentEMI) * 100 : 0;
    
    if (mlDifferencePercent < 1) {
        console.log('ML predictions too similar, using traditional calculations for comparison');
        currentEMI = calculateTraditionalEMI(currentData.loanAmount, currentData.rate, currentData.tenure);
        newEMI = calculateTraditionalEMI(newData.loanAmount, newData.rate, newData.tenure);
        
        // Add a note about this
        showNotification('Using traditional EMI calculation for comparison due to similar ML predictions', 'info');
    }
    
    console.log('Current EMI:', currentEMI);
    console.log('New EMI:', newEMI);
    
    const emiChange = newEMI - currentEMI;
    const emiChangePercent = currentEMI > 0 ? ((emiChange / currentEMI) * 100).toFixed(1) : 0;
    
    console.log('EMI Change:', emiChange);
    console.log('EMI Change Percent:', emiChangePercent);
    
    // Calculate total interest for both scenarios
    const currentTotalInterest = (currentEMI * currentData.tenure * 12) - currentData.loanAmount;
    const newTotalInterest = (newEMI * newData.tenure * 12) - newData.loanAmount;
    const interestSavings = currentTotalInterest - newTotalInterest;
    
    // Update EMI Change with better visibility
    const emiChangeEl = document.getElementById('emiChange');
    const emiChangePercentEl = document.getElementById('emiChangePercent');
    if (emiChangeEl && emiChangePercentEl) {
        emiChangeEl.textContent = (emiChange >= 0 ? '+' : '') + formatCurrency(emiChange);
        emiChangeEl.className = `text-2xl font-bold ${emiChange >= 0 ? 'text-red-600' : 'text-green-600'}`;
        emiChangePercentEl.textContent = emiChangePercent + '% change';
        
        // Add visual indicator for magnitude
        if (Math.abs(emiChange) < 100) {
            emiChangePercentEl.textContent += ' (Minimal)';
        } else if (Math.abs(emiChange) > 5000) {
            emiChangePercentEl.textContent += ' (Significant)';
        }
    }
    
    // Update Eligibility Impact with enhanced calculation
    const eligibilityChangeEl = document.getElementById('eligibilityChange');
    const eligibilityScoreEl = document.getElementById('eligibilityScore');
    if (eligibilityChangeEl && eligibilityScoreEl) {
        let currentProb = 0.5;
        let newProb = 0.5;
        
        if (currentElig && !currentElig.error) {
            currentProb = currentElig.prediction_probability || currentElig.confidence || 0.5;
        }
        
        if (newElig && !newElig.error) {
            newProb = newElig.prediction_probability || newElig.confidence || 0.5;
        }
        
        // Enhanced eligibility calculation based on scenario changes
        const incomeIncrease = (newData.income - currentData.income) / currentData.income;
        const creditScoreIncrease = newData.creditScore - currentData.creditScore;
        const loanAmountIncrease = (newData.loanAmount - currentData.loanAmount) / currentData.loanAmount;
        
        // Adjust probability based on logical changes
        if (incomeIncrease > 0.1 || creditScoreIncrease > 20) {
            newProb = Math.min(0.95, newProb + 0.1); // Improve if significant income/credit improvement
        }
        if (loanAmountIncrease > 0.2) {
            newProb = Math.max(0.1, newProb - 0.05); // Reduce if much higher loan amount
        }
        
        console.log('Current probability:', currentProb);
        console.log('New probability:', newProb);
        
        let eligibilityStatus = 'Same';
        const probDiff = newProb - currentProb;
        
        if (probDiff > 0.05) eligibilityStatus = 'Better';
        else if (probDiff < -0.05) eligibilityStatus = 'Worse';
        
        eligibilityChangeEl.textContent = eligibilityStatus;
        eligibilityChangeEl.className = `text-2xl font-bold ${
            eligibilityStatus === 'Better' ? 'text-green-600' : 
            eligibilityStatus === 'Worse' ? 'text-red-600' : 
            'text-yellow-600'
        }`;
        eligibilityScoreEl.textContent = `Probability: ${(newProb * 100).toFixed(1)}% (${probDiff >= 0 ? '+' : ''}${(probDiff * 100).toFixed(1)}%)`;
    }
    
    // Update Interest Savings with enhanced calculation
    const interestSavingsEl = document.getElementById('interestSavings');
    const savingsPercentEl = document.getElementById('savingsPercent');
    if (interestSavingsEl && savingsPercentEl) {
        interestSavingsEl.textContent = formatCurrency(Math.abs(interestSavings));
        interestSavingsEl.className = `text-2xl font-bold ${interestSavings >= 0 ? 'text-green-600' : 'text-red-600'}`;
        
        const totalInterestBase = Math.max(Math.abs(currentTotalInterest), Math.abs(newTotalInterest), 1);
        const savingsPercent = ((Math.abs(interestSavings) / totalInterestBase) * 100).toFixed(1);
        savingsPercentEl.textContent = `${savingsPercent}% ${interestSavings >= 0 ? 'savings' : 'additional cost'}`;
    }
    
    // Update Risk Level with enhanced logic
    const riskLevelEl = document.getElementById('riskLevel');
    const riskScoreEl = document.getElementById('riskScore');
    if (riskLevelEl && riskScoreEl) {
        let riskLevel = 'Medium';
        let riskScore = 0;
        
        // Use ML prediction if available, otherwise calculate
        if (newPred && !newPred.error && newPred.risk_level) {
            riskLevel = newPred.risk_level;
            riskScore = newPred.emi_to_income_ratio || ((newEMI / newData.income) * 100);
        } else {
            riskScore = (newEMI / newData.income) * 100;
            riskLevel = calculateRiskLevel(newEMI, newData.income);
        }
        
        riskLevelEl.textContent = riskLevel;
        riskLevelEl.className = `text-2xl font-bold ${
            riskLevel === 'Low' ? 'text-green-600' : 
            riskLevel === 'Medium' ? 'text-yellow-600' : 
            'text-red-600'
        }`;
        riskScoreEl.textContent = `EMI/Income: ${riskScore.toFixed(1)}%`;
    }
    
    // Generate enhanced recommendations
    generateEnhancedRecommendations(currentData, newData, currentEMI, newEMI, currentPred, newPred, currentElig, newElig);
    
    // Create enhanced comparison chart
    createEnhancedChart(currentEMI, newEMI, currentTotalInterest, newTotalInterest, currentElig, newElig);
    
    // Show results
    document.getElementById('analysisResults').classList.remove('hidden');
    document.getElementById('noAnalysis').classList.add('hidden');
}

function generateMLRecommendations(currentData, newData, currentPred, newPred, currentElig, newElig) {
    const recommendations = [];
    
    // EMI-based recommendations
    const emiChange = (newPred.predicted_amount || 0) - (currentPred.predicted_amount || 0);
    if (emiChange < -5000) {
        recommendations.push({
            icon: 'fa-thumbs-up',
            text: `Excellent! Your new scenario reduces EMI by ${formatCurrency(Math.abs(emiChange))} per month.`,
            type: 'success'
        });
    } else if (emiChange > 5000) {
        recommendations.push({
            icon: 'fa-exclamation-triangle',
            text: `EMI increases by ${formatCurrency(emiChange)}. Consider extending tenure or reducing loan amount.`,
            type: 'warning'
        });
    }
    
    // Eligibility-based recommendations
    const currentProb = currentElig.prediction_probability || 0.5;
    const newProb = newElig.prediction_probability || 0.5;
    
    if (newProb > currentProb + 0.1) {
        recommendations.push({
            icon: 'fa-star',
            text: `Great improvement! Eligibility probability increased by ${((newProb - currentProb) * 100).toFixed(1)}%.`,
            type: 'success'
        });
    } else if (newProb < currentProb - 0.1) {
        recommendations.push({
            icon: 'fa-chart-line-down',
            text: `Eligibility probability decreased. Consider improving credit score or reducing loan amount.`,
            type: 'warning'
        });
    }
    
    // Risk-based recommendations
    const riskLevel = newPred.risk_level;
    if (riskLevel === 'High') {
        recommendations.push({
            icon: 'fa-shield-alt',
            text: 'High risk detected. Consider increasing income or reducing loan amount for better approval chances.',
            type: 'warning'
        });
    } else if (riskLevel === 'Low') {
        recommendations.push({
            icon: 'fa-check-circle',
            text: 'Low risk profile. You might qualify for better interest rates from premium lenders.',
            type: 'success'
        });
    }
    
    // Income-based recommendations
    const incomeChange = newData.income - currentData.income;
    if (incomeChange > 10000) {
        recommendations.push({
            icon: 'fa-arrow-up',
            text: `Income increase of ${formatCurrency(incomeChange)} significantly improves your loan profile.`,
            type: 'success'
        });
    }
    
    // Credit score recommendations
    const creditScoreChange = newData.creditScore - currentData.creditScore;
    if (creditScoreChange > 20) {
        recommendations.push({
            icon: 'fa-medal',
            text: `Credit score improvement of ${creditScoreChange} points can help you negotiate better rates.`,
            type: 'info'
        });
    }
    
    // Default recommendation if none generated
    if (recommendations.length === 0) {
        recommendations.push({
            icon: 'fa-info-circle',
            text: 'Your scenarios show minimal changes. Consider more significant adjustments for better comparison.',
            type: 'info'
        });
    }
    
    // Render recommendations
    const container = document.getElementById('recommendations');
    if (container) {
        container.innerHTML = '';
        
        recommendations.forEach(rec => {
            const div = document.createElement('div');
            div.className = `flex items-center p-3 rounded-lg ${
                rec.type === 'success' ? 'bg-green-100 text-green-800' : 
                rec.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
            }`;
            div.innerHTML = `
                <i class="fas ${rec.icon} mr-3"></i>
                <span>${rec.text}</span>
            `;
            container.appendChild(div);
        });
    }
}

function createEnhancedChart(currentEMI, newEMI, currentInterest, newInterest, currentElig, newElig) {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }
    
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current Scenario', 'New Scenario'],
            datasets: [
                {
                    label: 'Monthly EMI (₹)',
                    data: [currentEMI, newEMI],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Total Interest (₹)',
                    data: [currentInterest, newInterest],
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Eligibility Probability (%)',
                    data: [
                        (currentElig.prediction_probability || 0.5) * 100, 
                        (newElig.prediction_probability || 0.5) * 100
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value/1000).toFixed(0) + 'K';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label.includes('Probability')) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                            }
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Helper functions
function calculateTraditionalEMI(principal, rate, years) {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
}

function calculateRiskLevel(emi, income) {
    const ratio = (emi / income) * 100;
    if (ratio > 50) return 'High';
    if (ratio > 30) return 'Medium';
    return 'Low';
}

function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function fallbackAnalysis() {
    console.log('Using fallback traditional analysis');
    
    const currentData = {
        income: parseFloat(document.getElementById('currentIncome').value) || 50000,
        loanAmount: parseFloat(document.getElementById('currentLoanAmount').value) || 2000000,
        tenure: parseFloat(document.getElementById('currentTenure').value) || 20,
        rate: parseFloat(document.getElementById('currentRate').value) || 8.5,
        creditScore: parseFloat(document.getElementById('currentCreditScore').value) || 750
    };
    
    const newData = {
        income: parseFloat(document.getElementById('newIncome').value) || 60000,
        loanAmount: parseFloat(document.getElementById('newLoanAmount').value) || 2500000,
        tenure: parseFloat(document.getElementById('newTenure').value) || 25,
        rate: parseFloat(document.getElementById('newRate').value) || 7.5,
        creditScore: parseFloat(document.getElementById('newCreditScore').value) || 800
    };
    
    const currentEMI = calculateTraditionalEMI(currentData.loanAmount, currentData.rate, currentData.tenure);
    const newEMI = calculateTraditionalEMI(newData.loanAmount, newData.rate, newData.tenure);
    
    const emiChange = newEMI - currentEMI;
    
    // Update basic results
    document.getElementById('emiChange').textContent = (emiChange >= 0 ? '+' : '') + formatCurrency(emiChange);
    document.getElementById('emiChangePercent').textContent = ((emiChange / currentEMI) * 100).toFixed(1) + '% change';
    
    document.getElementById('eligibilityChange').textContent = newData.creditScore > currentData.creditScore ? 'Better' : 'Same';
    document.getElementById('eligibilityScore').textContent = 'Score: ' + newData.creditScore;
    
    const riskLevel = calculateRiskLevel(newEMI, newData.income);
    document.getElementById('riskLevel').textContent = riskLevel;
    document.getElementById('riskScore').textContent = 'EMI/Income: ' + ((newEMI / newData.income) * 100).toFixed(1) + '%';
    
    // Show results
    document.getElementById('analysisResults').classList.remove('hidden');
    document.getElementById('noAnalysis').classList.add('hidden');
    
    showNotification('Basic analysis completed (ML models unavailable)', 'info');
}

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
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
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

function switchTab(tab) {
    currentTab = tab;
    
    const currentTabEl = document.getElementById('currentTab');
    const newTabEl = document.getElementById('newTab');
    const currentScenarioEl = document.getElementById('currentScenario');
    const newScenarioEl = document.getElementById('newScenario');
    
    if (currentTabEl && newTabEl && currentScenarioEl && newScenarioEl) {
        // Update tab buttons
        currentTabEl.className = tab === 'current' ? 
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all bg-white text-gray-900 shadow-sm' :
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all text-gray-500';
        
        newTabEl.className = tab === 'new' ? 
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all bg-white text-gray-900 shadow-sm' :
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all text-gray-500';
        
        // Show/hide forms
        currentScenarioEl.classList.toggle('hidden', tab !== 'current');
        newScenarioEl.classList.toggle('hidden', tab !== 'new');
    }
}

function loadTemplate(template) {
    const templates = {
        'income_increase': {
            description: 'Income increase by 20%',
            current: { income: 50000, emi: 15000, loanAmount: 2000000, tenure: 20, rate: 8.5, creditScore: 750 },
            new: { income: 60000, emi: 15000, loanAmount: 2000000, tenure: 20, rate: 8.5, creditScore: 750 }
        },
        'rate_decrease': {
            description: '1% interest rate reduction',
            current: { income: 50000, emi: 15000, loanAmount: 2000000, tenure: 20, rate: 8.5, creditScore: 750 },
            new: { income: 50000, emi: 15000, loanAmount: 2000000, tenure: 20, rate: 7.5, creditScore: 750 }
        },
        'tenure_extend': {
            description: 'Extend tenure by 5 years',
            current: { income: 50000, emi: 15000, loanAmount: 2000000, tenure: 20, rate: 8.5, creditScore: 750 },
            new: { income: 50000, emi: 15000, loanAmount: 2000000, tenure: 25, rate: 8.5, creditScore: 750 }
        }
    };
    
    const selectedTemplate = templates[template];
    if (!selectedTemplate) return;
    
    // Fill current scenario
    Object.keys(selectedTemplate.current).forEach(key => {
        const field = document.getElementById('current' + key.charAt(0).toUpperCase() + key.slice(1));
        if (field) {
            field.value = selectedTemplate.current[key];
        }
    });
    
    // Fill new scenario
    Object.keys(selectedTemplate.new).forEach(key => {
        const field = document.getElementById('new' + key.charAt(0).toUpperCase() + key.slice(1));
        if (field) {
            field.value = selectedTemplate.new[key];
        }
    });
    
    showNotification(`Template loaded: ${selectedTemplate.description}`, 'info');
}

// Make functions globally available
window.fillSampleData = fillSampleData;
window.analyzeScenarios = analyzeScenarios;
window.switchTab = switchTab;
window.loadTemplate = loadTemplate;

// Enhanced utility functions for better calculations
function calculateTraditionalEMI(principal, rate, tenure) {
    if (!principal || !rate || !tenure) return 0;
    
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
        return principal / months;
    }
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return Math.round(emi);
}

function calculateRiskLevel(emi, income) {
    if (!emi || !income) return 'Medium';
    
    const ratio = (emi / income) * 100;
    
    if (ratio <= 30) return 'Low';
    else if (ratio <= 50) return 'Medium';
    else return 'High';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-md ${
        type === 'info' ? 'bg-blue-500 text-white' : 
        type === 'warning' ? 'bg-yellow-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-green-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${
                type === 'info' ? 'ℹ️' : 
                type === 'warning' ? '⚠️' : 
                type === 'error' ? '❌' : 
                '✅'
            }</span>
            <span class="text-sm">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 text-lg leading-none">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 5000);
}

function generateEnhancedRecommendations(currentData, newData, currentEMI, newEMI, currentPred, newPred, currentElig, newElig) {
    const recommendationsEl = document.getElementById('mlRecommendations');
    if (!recommendationsEl) return;
    
    let recommendations = [];
    
    // Compare EMI changes
    const emiChange = newEMI - currentEMI;
    const emiChangePercent = currentEMI > 0 ? (emiChange / currentEMI) * 100 : 0;
    
    if (emiChangePercent > 10) {
        recommendations.push({
            type: 'warning',
            text: `⚠️ EMI increases by ${emiChangePercent.toFixed(1)}% (${formatCurrency(emiChange)}). Consider reducing loan amount or extending tenure.`
        });
    } else if (emiChangePercent < -5) {
        recommendations.push({
            type: 'success',
            text: `✅ EMI reduces by ${Math.abs(emiChangePercent).toFixed(1)}% (${formatCurrency(Math.abs(emiChange))}). This change is beneficial for your budget.`
        });
    }
    
    // Income to EMI ratio analysis
    const newRatio = (newEMI / newData.income) * 100;
    if (newRatio > 50) {
        recommendations.push({
            type: 'danger',
            text: '🚨 High Risk: EMI-to-income ratio exceeds 50%. Consider increasing income or reducing loan amount.'
        });
    } else if (newRatio <= 30) {
        recommendations.push({
            type: 'success',
            text: '✅ Optimal: EMI-to-income ratio is healthy (≤30%). Good financial position.'
        });
    }
    
    // Credit score recommendations
    if (newData.creditScore < 650) {
        recommendations.push({
            type: 'warning',
            text: '💳 Credit Score: Consider improving credit score to 700+ for better rates and approval chances.'
        });
    } else if (newData.creditScore >= 750) {
        recommendations.push({
            type: 'success',
            text: '⭐ Excellent Credit: Your high credit score should help get the best interest rates.'
        });
    }
    
    // Tenure optimization
    if (newData.tenure > 25) {
        const shortTenureEMI = calculateTraditionalEMI(newData.loanAmount, newData.rate, 20);
        const interestSavings = ((newEMI * newData.tenure * 12) - (shortTenureEMI * 20 * 12));
        recommendations.push({
            type: 'info',
            text: `💡 Tenure Optimization: Reducing tenure to 20 years could save ${formatCurrency(interestSavings)} in interest (EMI: ${formatCurrency(shortTenureEMI)}).`
        });
    }
    
    // Loan amount recommendations
    const loanToIncomeRatio = newData.loanAmount / (newData.income * 12);
    if (loanToIncomeRatio > 5) {
        recommendations.push({
            type: 'warning',
            text: '📊 Loan Amount: Consider reducing loan amount. Current loan is more than 5x annual income.'
        });
    }
    
    // ML-specific recommendations
    if (newPred && !newPred.error) {
        if (newPred.affordability_score && newPred.affordability_score < 0.6) {
            recommendations.push({
                type: 'warning',
                text: '🎯 ML Insight: Low affordability score detected. Consider adjusting loan parameters.'
            });
        }
        
        if (newPred.risk_level === 'High') {
            recommendations.push({
                type: 'danger',
                text: '🔴 ML Risk Assessment: High risk profile detected. Review all parameters carefully.'
            });
        }
    }
    
    // Eligibility recommendations
    if (newElig && newElig.prediction_probability < 0.7) {
        recommendations.push({
            type: 'warning',
            text: `📋 Approval Probability: ${(newElig.prediction_probability * 100).toFixed(1)}% approval chance. Consider improving profile or reducing loan amount.`
        });
    }
    
    // Default recommendation if none generated
    if (recommendations.length === 0) {
        recommendations.push({
            type: 'info',
            text: '✨ Your loan parameters look reasonable. Consider comparing rates from multiple lenders.'
        });
    }
    
    // Display recommendations
    recommendationsEl.innerHTML = recommendations.map(rec => 
        `<div class="p-3 rounded-lg mb-2 ${
            rec.type === 'success' ? 'bg-green-100 text-green-800' :
            rec.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            rec.type === 'danger' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
        }">${rec.text}</div>`
    ).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced What-If Analysis initialized');
    
    // Load Chart.js if not available
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(script);
    }
});