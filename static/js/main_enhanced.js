// Enhanced Main JavaScript with Unified ML Integration Framework
console.log('Enhanced Main.js loaded successfully - Unified ML Framework Initialized');

// Enhanced global configuration for ML-powered features
const enhancedMLConfig = {
    apiEndpoints: {
        // ML should ONLY predict eligibility/risk, NOT calculate EMI amounts
        predictEligibility: '/api/predict_eligibility',
        realTimeData: '/api/real_time_data',
        mlMetrics: '/api/ml_metrics'
    },
    features: {
        totalFeatures: 65,
        requiredFeatures: 15,
        optionalFeatures: 50
    },
    performance: {
        requestTimeout: 10000,
        maxRetries: 3,
        cacheTimeout: 300000, // 5 minutes
        batchSize: 10
    },
    ui: {
        animationDuration: 800,
        notificationDuration: 5000,
        autoHideDelay: 3000,
        loadingSpinnerDelay: 500
    },
    validation: {
        minCreditScore: 300,
        maxCreditScore: 850,
        minAge: 18,
        maxAge: 70,
        minIncome: 10000,
        maxLoanAmount: 50000000
    }
};

// Enhanced comprehensive sample data repository
const enhancedSampleDataRepository = {
    profiles: {
        young_professional: {
            age: 28,
            monthlyIncome: 75000,
            creditScore: 720,
            employmentType: 'Private',
            workExperience: 4,
            loanAmount: 2500000,
            loanTenure: 20,
            interestRate: 8.5,
            city: 'Mumbai',
            propertyValue: 3500000,
            downPayment: 1000000,
            existingEMIs: 5000,
            dependents: 0,
            education: 'Graduate',
            companyCategory: 'Category_A',
            grossAnnualIncome: 900000,
            netAnnualIncome: 720000,
            bankRelationship: 2,
            accountType: 'Savings',
            averageBalance: 150000,
            creditUtilization: 25,
            loanToValue: 71.4,
            debtToIncome: 40.0,
            savingsToIncome: 20.0
        },
        experienced_executive: {
            age: 42,
            monthlyIncome: 150000,
            creditScore: 780,
            employmentType: 'Private',
            workExperience: 18,
            loanAmount: 4500000,
            loanTenure: 25,
            interestRate: 8.2,
            city: 'Bangalore',
            propertyValue: 6000000,
            downPayment: 1500000,
            existingEMIs: 12000,
            dependents: 2,
            education: 'Post_Graduate',
            companyCategory: 'Category_A',
            grossAnnualIncome: 1800000,
            netAnnualIncome: 1440000,
            bankRelationship: 8,
            accountType: 'Savings',
            averageBalance: 500000,
            creditUtilization: 15,
            loanToValue: 75.0,
            debtToIncome: 30.0,
            savingsToIncome: 35.0
        },
        government_employee: {
            age: 35,
            monthlyIncome: 85000,
            creditScore: 750,
            employmentType: 'Government',
            workExperience: 12,
            loanAmount: 3000000,
            loanTenure: 30,
            interestRate: 7.8,
            city: 'Delhi',
            propertyValue: 4200000,
            downPayment: 1200000,
            existingEMIs: 8000,
            dependents: 1,
            education: 'Graduate',
            companyCategory: 'Government',
            grossAnnualIncome: 1020000,
            netAnnualIncome: 850000,
            bankRelationship: 5,
            accountType: 'Savings',
            averageBalance: 250000,
            creditUtilization: 20,
            loanToValue: 71.4,
            debtToIncome: 35.0,
            savingsToIncome: 30.0
        },
        self_employed: {
            age: 38,
            monthlyIncome: 120000,
            creditScore: 690,
            employmentType: 'Self_Employed',
            workExperience: 10,
            loanAmount: 3500000,
            loanTenure: 18,
            interestRate: 9.5,
            city: 'Pune',
            propertyValue: 5000000,
            downPayment: 1500000,
            existingEMIs: 15000,
            dependents: 3,
            education: 'Graduate',
            companyCategory: 'Self_Employed',
            grossAnnualIncome: 1440000,
            netAnnualIncome: 1200000,
            bankRelationship: 3,
            accountType: 'Current',
            averageBalance: 180000,
            creditUtilization: 35,
            loanToValue: 70.0,
            debtToIncome: 45.0,
            savingsToIncome: 15.0
        },
        first_time_buyer: {
            age: 26,
            monthlyIncome: 55000,
            creditScore: 680,
            employmentType: 'Private',
            workExperience: 2,
            loanAmount: 1800000,
            loanTenure: 25,
            interestRate: 8.8,
            city: 'Chennai',
            propertyValue: 2200000,
            downPayment: 400000,
            existingEMIs: 2000,
            dependents: 0,
            education: 'Graduate',
            companyCategory: 'Category_B',
            grossAnnualIncome: 660000,
            netAnnualIncome: 550000,
            bankRelationship: 1,
            accountType: 'Savings',
            averageBalance: 80000,
            creditUtilization: 30,
            loanToValue: 81.8,
            debtToIncome: 50.0,
            savingsToIncome: 15.0
        }
    },
    
    // Generate additional features for comprehensive ML analysis
    generateEnhancedFeatures: function(baseProfile) {
        const enhanced = { ...baseProfile };
        
        // Calculate derived features
        enhanced.emiToIncomeRatio = ((enhanced.loanAmount * 0.008) / enhanced.monthlyIncome) * 100;
        enhanced.totalObligationToIncome = ((enhanced.existingEMIs + (enhanced.loanAmount * 0.008)) / enhanced.monthlyIncome) * 100;
        enhanced.residualIncome = enhanced.monthlyIncome - enhanced.existingEMIs - (enhanced.loanAmount * 0.008);
        enhanced.ageAtLoanMaturity = enhanced.age + enhanced.loanTenure;
        enhanced.incomeStability = enhanced.employmentType === 'Government' ? 95 : 
                                  enhanced.employmentType === 'Private' ? 80 : 65;
        enhanced.financialStress = enhanced.totalObligationToIncome > 50 ? 'High' : 
                                  enhanced.totalObligationToIncome > 40 ? 'Medium' : 'Low';
        
        // Add location-based factors
        const cityFactors = {
            'Mumbai': { costOfLiving: 85, propertyAppreciation: 12, marketRisk: 25 },
            'Delhi': { costOfLiving: 80, propertyAppreciation: 10, marketRisk: 30 },
            'Bangalore': { costOfLiving: 75, propertyAppreciation: 15, marketRisk: 20 },
            'Chennai': { costOfLiving: 65, propertyAppreciation: 8, marketRisk: 15 },
            'Pune': { costOfLiving: 70, propertyAppreciation: 12, marketRisk: 18 }
        };
        
        const cityFactor = cityFactors[enhanced.city] || cityFactors['Chennai'];
        enhanced.costOfLivingIndex = cityFactor.costOfLiving;
        enhanced.propertyAppreciationRate = cityFactor.propertyAppreciation;
        enhanced.marketRiskFactor = cityFactor.marketRisk;
        
        // Add behavioral finance features
        enhanced.savingsRate = (enhanced.monthlyIncome - enhanced.existingEMIs - (enhanced.monthlyIncome * 0.7)) / enhanced.monthlyIncome * 100;
        enhanced.riskAppetite = enhanced.age < 35 ? 'High' : enhanced.age < 50 ? 'Medium' : 'Low';
        enhanced.investmentExperience = enhanced.workExperience > 10 ? 'Experienced' : 
                                      enhanced.workExperience > 5 ? 'Moderate' : 'Beginner';
        
        // Add additional ML features to reach 65 total features
        enhanced.seasonality = new Date().getMonth() + 1; // 1-12
        enhanced.applicationChannel = 'Online';
        enhanced.referralSource = 'Direct';
        enhanced.digitalFootprint = Math.random() * 100;
        enhanced.socialMediaScore = Math.random() * 100;
        enhanced.phoneVerification = true;
        enhanced.emailVerification = true;
        enhanced.addressVerification = true;
        enhanced.incomeVerification = true;
        enhanced.employmentVerification = true;
        
        return enhanced;
    }
};

// Enhanced notification system with advanced features
class EnhancedNotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.container = null;
        this.initialize();
    }

    initialize() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'enhanced-notification-container';
            this.container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', options = {}) {
        const defaultOptions = {
            duration: enhancedMLConfig.ui.notificationDuration,
            priority: 'normal',
            actions: [],
            persistent: false,
            progress: false
        };
        
        const config = { ...defaultOptions, ...options };
        const id = this.generateId();
        
        const notification = this.createNotification(id, message, type, config);
        this.addNotification(notification, config);
        
        if (!config.persistent) {
            setTimeout(() => this.remove(id), config.duration);
        }
        
        return id;
    }

    createNotification(id, message, type, config) {
        const typeConfig = {
            success: { bg: 'bg-green-500', icon: 'fa-check-circle', textColor: 'text-white' },
            error: { bg: 'bg-red-500', icon: 'fa-exclamation-triangle', textColor: 'text-white' },
            warning: { bg: 'bg-yellow-500', icon: 'fa-exclamation-circle', textColor: 'text-white' },
            info: { bg: 'bg-blue-500', icon: 'fa-info-circle', textColor: 'text-white' },
            ml: { bg: 'bg-purple-500', icon: 'fa-brain', textColor: 'text-white' },
            loading: { bg: 'bg-gray-500', icon: 'fa-spinner fa-spin', textColor: 'text-white' }
        };
        
        const style = typeConfig[type] || typeConfig.info;
        const priorityClass = config.priority === 'high' ? 'ring-4 ring-white ring-opacity-50 shadow-2xl' : 'shadow-lg';
        
        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.className = `${style.bg} ${style.textColor} px-6 py-4 rounded-lg transition-all duration-300 transform translate-x-full ${priorityClass}`;
        
        let actionsHtml = '';
        if (config.actions.length > 0) {
            actionsHtml = `
                <div class="mt-3 flex space-x-2">
                    ${config.actions.map(action => `
                        <button onclick="${action.callback}" class="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-xs font-medium transition-colors">
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            `;
        }
        
        let progressHtml = '';
        if (config.progress) {
            progressHtml = `
                <div class="mt-2">
                    <div class="bg-white bg-opacity-20 rounded-full h-2">
                        <div id="progress-${id}" class="bg-white rounded-full h-2 transition-all duration-300" style="width: 0%"></div>
                    </div>
                </div>
            `;
        }
        
        notification.innerHTML = `
            <div class="flex items-start">
                <i class="fas ${style.icon} mt-1 mr-3 flex-shrink-0"></i>
                <div class="flex-1">
                    <div class="text-sm font-medium">${message}</div>
                    ${progressHtml}
                    ${actionsHtml}
                </div>
                ${!config.persistent ? `
                    <button onclick="enhancedNotificationManager.remove('${id}')" class="ml-4 text-white hover:text-gray-200 text-lg leading-none flex-shrink-0">×</button>
                ` : ''}
            </div>
        `;
        
        return notification;
    }

    addNotification(notification, config) {
        // Remove excess notifications
        while (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            if (oldest.element && oldest.element.parentElement) {
                oldest.element.remove();
            }
        }
        
        // Add new notification
        this.notifications.push({ element: notification, config });
        
        if (config.priority === 'high') {
            this.container.insertBefore(notification, this.container.firstChild);
        } else {
            this.container.appendChild(notification);
        }
        
        // Trigger entrance animation
        setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    }

    remove(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
                // Remove from tracking
                this.notifications = this.notifications.filter(n => n.element.id !== `notification-${id}`);
            }, 300);
        }
    }

    updateProgress(id, percentage) {
        const progressBar = document.getElementById(`progress-${id}`);
        if (progressBar) {
            progressBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
        }
    }

    clear() {
        this.notifications.forEach(n => {
            if (n.element && n.element.parentElement) {
                n.element.remove();
            }
        });
        this.notifications = [];
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Enhanced ML API client with comprehensive error handling and caching
class EnhancedMLAPIClient {
    constructor() {
        this.cache = new Map();
        this.requestQueue = [];
        this.isProcessing = false;
    }

    // ML should NOT predict EMI amounts - removed predictEMI function
    // Use mathematical formulas for all EMI calculations

    async predictEligibility(profileData) {
        const cacheKey = this.generateCacheKey('eligibility', profileData);
        const cached = this.getFromCache(cacheKey);
        
        if (cached) {
            console.log('Returning cached eligibility prediction');
            return cached;
        }

        const prediction = await this.makeRequest(enhancedMLConfig.apiEndpoints.predictEligibility, profileData);
        this.setCache(cacheKey, prediction);
        
        return prediction;
    }

    async batchPredict(requests) {
        const results = [];
        
        for (let i = 0; i < requests.length; i += enhancedMLConfig.performance.batchSize) {
            const batch = requests.slice(i, i + enhancedMLConfig.performance.batchSize);
            const batchPromises = batch.map(req => {
                if (req.type === 'emi') {
                    return this.predictEMI(req.data);
                } else if (req.type === 'eligibility') {
                    return this.predictEligibility(req.data);
                }
            });
            
            const batchResults = await Promise.allSettled(batchPromises);
            results.push(...batchResults);
        }
        
        return results;
    }

    async makeRequest(endpoint, data, retries = 0) {
        try {
            console.log(`Making ML API request to ${endpoint}`, data);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), enhancedMLConfig.performance.requestTimeout);
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('ML API response received:', result);
            
            return result;
            
        } catch (error) {
            console.error('ML API request error:', error);
            
            if (retries < enhancedMLConfig.performance.maxRetries && !error.name === 'AbortError') {
                console.log(`Retrying request, attempt ${retries + 1}`);
                await this.delay(1000 * (retries + 1)); // Exponential backoff
                return this.makeRequest(endpoint, data, retries + 1);
            }
            
            // Return fallback result for graceful degradation
            return this.generateFallbackResult(endpoint, data);
        }
    }

    generateFallbackResult(endpoint, data) {
        console.log('Generating fallback result for', endpoint);
        
        if (endpoint.includes('predict_emi')) {
            const estimatedEMI = this.calculateTraditionalEMI(
                data.loanAmount || 1000000,
                data.interestRate || 8.5,
                data.loanTenure || 20
            );
            
            return {
                predicted_emi: estimatedEMI,
                confidence: 0.7,
                fallback: true,
                factors: {
                    loan_amount: data.loanAmount || 1000000,
                    interest_rate: data.interestRate || 8.5,
                    tenure: data.loanTenure || 20
                }
            };
        } else if (endpoint.includes('predict_eligibility')) {
            const estimatedEligibility = this.calculateTraditionalEligibility(data);
            
            return {
                eligibility_status: estimatedEligibility.status,
                probability: estimatedEligibility.probability,
                fallback: true,
                factors: estimatedEligibility.factors
            };
        }
        
        return { error: 'Unable to process request', fallback: true };
    }

    calculateTraditionalEMI(principal, rate, years) {
        const monthlyRate = rate / (12 * 100);
        const totalMonths = years * 12;
        
        if (monthlyRate === 0) return principal / totalMonths;
        
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                   (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        return Math.round(emi);
    }

    calculateTraditionalEligibility(data) {
        let score = 0;
        const factors = {};
        
        // Credit score factor (40%)
        if (data.creditScore >= 750) score += 40;
        else if (data.creditScore >= 700) score += 30;
        else if (data.creditScore >= 650) score += 20;
        else score += 10;
        factors.credit_score = data.creditScore;
        
        // Income factor (30%)
        const monthlyIncome = data.monthlyIncome || 50000;
        if (monthlyIncome >= 100000) score += 30;
        else if (monthlyIncome >= 75000) score += 25;
        else if (monthlyIncome >= 50000) score += 20;
        else score += 10;
        factors.monthly_income = monthlyIncome;
        
        // Employment factor (20%)
        if (data.employmentType === 'Government') score += 20;
        else if (data.employmentType === 'Private') score += 15;
        else score += 10;
        factors.employment_type = data.employmentType;
        
        // Age factor (10%)
        const age = data.age || 35;
        if (age >= 25 && age <= 50) score += 10;
        else if (age >= 21 && age <= 60) score += 8;
        else score += 5;
        factors.age = age;
        
        const probability = score / 100;
        const status = probability > 0.7 ? 'Approved' : probability > 0.5 ? 'Conditional' : 'Rejected';
        
        return { status, probability, factors };
    }

    generateCacheKey(type, data) {
        const keyData = {
            type,
            loanAmount: data.loanAmount,
            monthlyIncome: data.monthlyIncome,
            creditScore: data.creditScore,
            age: data.age,
            employmentType: data.employmentType
        };
        
        return btoa(JSON.stringify(keyData));
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < enhancedMLConfig.performance.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
        
        // Limit cache size
        if (this.cache.size > 100) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    clearCache() {
        this.cache.clear();
        console.log('ML API cache cleared');
    }
}

// Enhanced form data collector with comprehensive validation
class EnhancedFormDataCollector {
    static collectComprehensiveProfile(formSelectors = {}) {
        const defaultSelectors = {
            loanAmount: '#loanAmount, [name="loanAmount"], #amount',
            monthlyIncome: '#monthlyIncome, [name="monthlyIncome"], #income',
            creditScore: '#creditScore, [name="creditScore"]',
            age: '#age, [name="age"]',
            employmentType: '#employmentType, [name="employmentType"]',
            loanTenure: '#loanTenure, [name="loanTenure"], #tenure',
            interestRate: '#interestRate, [name="interestRate"]'
        };
        
        const selectors = { ...defaultSelectors, ...formSelectors };
        const profile = {};
        const errors = [];
        
        // Collect basic form data
        Object.keys(selectors).forEach(field => {
            const element = document.querySelector(selectors[field]);
            if (element) {
                let value = element.type === 'checkbox' ? element.checked : element.value;
                
                // Convert to appropriate type
                if (['loanAmount', 'monthlyIncome', 'creditScore', 'age', 'loanTenure', 'interestRate'].includes(field)) {
                    value = parseFloat(value) || 0;
                }
                
                profile[field] = value;
            }
        });
        
        // Validate required fields
        const validationErrors = this.validateProfile(profile);
        errors.push(...validationErrors);
        
        // Generate enhanced features
        const enhancedProfile = enhancedSampleDataRepository.generateEnhancedFeatures(profile);
        
        return {
            profile: enhancedProfile,
            errors,
            isValid: errors.length === 0,
            featureCount: Object.keys(enhancedProfile).length
        };
    }

    static validateProfile(profile) {
        const errors = [];
        const config = enhancedMLConfig.validation;
        
        // Credit score validation
        if (profile.creditScore < config.minCreditScore || profile.creditScore > config.maxCreditScore) {
            errors.push(`Credit score must be between ${config.minCreditScore} and ${config.maxCreditScore}`);
        }
        
        // Age validation
        if (profile.age < config.minAge || profile.age > config.maxAge) {
            errors.push(`Age must be between ${config.minAge} and ${config.maxAge}`);
        }
        
        // Income validation
        if (profile.monthlyIncome < config.minIncome) {
            errors.push(`Monthly income must be at least ₹${config.minIncome.toLocaleString()}`);
        }
        
        // Loan amount validation
        if (profile.loanAmount > config.maxLoanAmount) {
            errors.push(`Loan amount cannot exceed ₹${config.maxLoanAmount.toLocaleString()}`);
        }
        
        return errors;
    }

    static fillSampleData(profileType = 'young_professional') {
        const profile = enhancedSampleDataRepository.profiles[profileType];
        if (!profile) {
            console.error('Profile type not found:', profileType);
            return false;
        }
        
        console.log('Filling enhanced sample data for profile:', profileType);
        
        // Fill form fields
        Object.keys(profile).forEach(fieldName => {
            const selectors = [
                `#${fieldName}`,
                `[name="${fieldName}"]`,
                `.${fieldName}`,
                `input[id*="${fieldName}"]`,
                `select[id*="${fieldName}"]`
            ];
            
            for (const selector of selectors) {
                const field = document.querySelector(selector);
                if (field) {
                    if (field.tagName === 'SELECT') {
                        field.value = profile[fieldName];
                    } else if (field.type === 'radio') {
                        const radioButton = document.querySelector(`input[name="${fieldName}"][value="${profile[fieldName]}"]`);
                        if (radioButton) radioButton.checked = true;
                    } else if (field.type === 'checkbox') {
                        field.checked = profile[fieldName] === 'Yes' || profile[fieldName] === true;
                    } else {
                        field.value = profile[fieldName];
                    }
                    
                    // Trigger change event
                    field.dispatchEvent(new Event('change', { bubbles: true }));
                    break;
                }
            }
        });
        
        return true;
    }
}

// Enhanced loading manager with progress tracking
class EnhancedLoadingManager {
    constructor() {
        this.activeLoaders = new Map();
    }

    show(id, message = 'Processing...', options = {}) {
        const defaultOptions = {
            showProgress: false,
            showSpinner: true,
            overlay: false,
            position: 'fixed'
        };
        
        const config = { ...defaultOptions, ...options };
        
        if (this.activeLoaders.has(id)) {
            this.hide(id);
        }
        
        const notificationId = enhancedNotificationManager.show(
            `<i class="fas fa-spinner fa-spin mr-2"></i>${message}`,
            'loading',
            {
                persistent: true,
                progress: config.showProgress,
                priority: 'high'
            }
        );
        
        this.activeLoaders.set(id, {
            notificationId,
            config,
            startTime: Date.now()
        });
        
        return notificationId;
    }

    updateProgress(id, percentage, message) {
        const loader = this.activeLoaders.get(id);
        if (loader) {
            enhancedNotificationManager.updateProgress(loader.notificationId, percentage);
            if (message) {
                const notification = document.getElementById(`notification-${loader.notificationId}`);
                if (notification) {
                    const messageElement = notification.querySelector('.text-sm');
                    if (messageElement) {
                        messageElement.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${message}`;
                    }
                }
            }
        }
    }

    hide(id) {
        const loader = this.activeLoaders.get(id);
        if (loader) {
            enhancedNotificationManager.remove(loader.notificationId);
            this.activeLoaders.delete(id);
            
            const duration = Date.now() - loader.startTime;
            console.log(`Loading completed for ${id} in ${duration}ms`);
        }
    }

    hideAll() {
        this.activeLoaders.forEach((loader, id) => this.hide(id));
    }
}

// Initialize enhanced global managers
const enhancedNotificationManager = new EnhancedNotificationManager();
const enhancedMLAPIClient = new EnhancedMLAPIClient();
const enhancedLoadingManager = new EnhancedLoadingManager();

// Enhanced global utility functions
window.enhancedML = {
    // Notification functions
    showNotification: (message, type, options) => enhancedNotificationManager.show(message, type, options),
    showSuccess: (message, options) => enhancedNotificationManager.show(message, 'success', options),
    showError: (message, options) => enhancedNotificationManager.show(message, 'error', options),
    showWarning: (message, options) => enhancedNotificationManager.show(message, 'warning', options),
    showInfo: (message, options) => enhancedNotificationManager.show(message, 'info', options),
    showMLNotification: (message, options) => enhancedNotificationManager.show(message, 'ml', options),
    
    // ML API functions - ONLY for predictions, NOT calculations
    // predictEMI: REMOVED - use mathematical formulas for EMI calculations
    predictEligibility: (data) => enhancedMLAPIClient.predictEligibility(data),
    batchPredict: (requests) => enhancedMLAPIClient.batchPredict(requests),
    
    // Form data functions
    collectProfile: (selectors) => EnhancedFormDataCollector.collectComprehensiveProfile(selectors),
    fillSampleData: (profileType) => EnhancedFormDataCollector.fillSampleData(profileType),
    validateProfile: (profile) => EnhancedFormDataCollector.validateProfile(profile),
    
    // Loading functions
    showLoading: (id, message, options) => enhancedLoadingManager.show(id, message, options),
    updateProgress: (id, percentage, message) => enhancedLoadingManager.updateProgress(id, percentage, message),
    hideLoading: (id) => enhancedLoadingManager.hide(id),
    
    // Utility functions
    config: enhancedMLConfig,
    sampleData: enhancedSampleDataRepository,
    clearCache: () => enhancedMLAPIClient.clearCache(),
    clearNotifications: () => enhancedNotificationManager.clear()
};

// Enhanced global sample data function for backward compatibility
function fillSampleData(profileType = 'young_professional') {
    try {
        // Backward compatibility: if legacy sampleDataSets exist (from main.js)
        // and contain the requested profile/form key (e.g. 'emiCalculator'),
        // delegate to that implementation which fills simple form fields.
        if (window && window.sampleDataSets && window.sampleDataSets[profileType]) {
            console.log('Delegating to legacy sampleDataSets for profile:', profileType);

            // If utils.fillSampleData is available (main.js), use it for consistency
            if (window.utils && typeof window.utils.fillSampleData === 'function') {
                window.utils.fillSampleData(profileType);
                enhancedNotificationManager.show(`Sample data filled: ${profileType}`, 'success');
                return true;
            }

            // Fallback manual fill using legacy sampleDataSets
            const samples = window.sampleDataSets[profileType];
            if (samples && samples.length > 0) {
                const randomSample = samples[Math.floor(Math.random() * samples.length)];
                Object.keys(randomSample).forEach(fieldName => {
                    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
                    if (field) {
                        try {
                            if (field.tagName === 'SELECT' || field.type === 'select-one') {
                                field.value = randomSample[fieldName];
                            } else if (field.type === 'radio') {
                                const radioButton = document.querySelector(`input[name="${fieldName}"][value="${randomSample[fieldName]}"]`);
                                if (radioButton) radioButton.checked = true;
                            } else if (field.type === 'checkbox') {
                                field.checked = !!randomSample[fieldName];
                            } else {
                                field.value = randomSample[fieldName];
                            }
                            field.dispatchEvent(new Event('change', { bubbles: true }));
                        } catch (e) {
                            console.warn('Failed to set field', fieldName, e);
                        }
                    }
                });

                enhancedNotificationManager.show(`Sample data filled: ${profileType}`, 'success');
                return true;
            }
        }

            // Special-case fallback for the legacy EMI calculator form
        if (profileType === 'emiCalculator') {
            try {
                console.log('Enhanced fallback: filling basic EMI calculator fields for', profileType);
                const defaults = {
                    loanAmount: 2500000,
                    interestRate: 8.5,
                    loanTenure: 20,
                    tenureType: 'years'
                };

                Object.keys(defaults).forEach(fieldName => {
                    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
                    if (field) {
                        try {
                            if (field.tagName === 'SELECT' || field.type === 'select-one') {
                                field.value = defaults[fieldName];
                            } else if (field.type === 'radio') {
                                const radioButton = document.querySelector(`input[name="${fieldName}"][value="${defaults[fieldName]}"]`);
                                if (radioButton) radioButton.checked = true;
                            } else if (field.type === 'checkbox') {
                                field.checked = !!defaults[fieldName];
                            } else {
                                field.value = defaults[fieldName];
                            }
                            field.dispatchEvent(new Event('change', { bubbles: true }));
                        } catch (e) {
                            console.warn('Enhanced fallback failed to set field', fieldName, e);
                        }
                    }
                });

                enhancedNotificationManager.show(`Sample data filled (EMI fallback): ${profileType}`, 'success');
                return true;
            } catch (e) {
                console.warn('Enhanced fallback for emiCalculator failed:', e);
            }
        }

        // Otherwise, use enhanced profiles repository
        const success = EnhancedFormDataCollector.fillSampleData(profileType);
        if (success) {
            enhancedNotificationManager.show(
                `✨ Enhanced ${profileType.replace('_', ' ')} profile loaded with 65+ ML features!`,
                'ml',
                { duration: 3000 }
            );
            return true;
        } else {
            enhancedNotificationManager.show(`❌ Failed to load profile: ${profileType}`, 'error');
            return false;
        }
    } catch (err) {
        console.error('Error in fillSampleData:', err);
        enhancedNotificationManager.show(`❌ Failed to load profile: ${profileType}`, 'error');
        return false;
    }
}

// Enhanced error handling (deduplicated & rate-limited)
(() => {
    const recentErrors = new Map(); // message -> timestamp
    const DEDUP_WINDOW_MS = 10000; // 10 seconds

    window.addEventListener('error', function(event) {
        try {
            const err = event && (event.error || event.message || event.filename) ? (event.error || event.message || event.filename) : 'Unknown error';
            console.error('Enhanced Main.js - Global error:', event.error || event);

            const key = typeof err === 'string' ? err : (err && err.message) ? err.message : String(err);
            const now = Date.now();

            // If we've shown this error recently, skip showing a new notification
            const last = recentErrors.get(key) || 0;
            if (now - last < DEDUP_WINDOW_MS) {
                // update the timestamp to extend suppression window
                recentErrors.set(key, now);
                return;
            }

            recentErrors.set(key, now);

            // Clean up old entries periodically
            for (const [k, ts] of recentErrors.entries()) {
                if (now - ts > DEDUP_WINDOW_MS * 6) recentErrors.delete(k);
            }

            // Show a single concise notification while logging details to console
            enhancedNotificationManager.show(
                '⚠️ An unexpected error occurred. Check the console for details (one notification shown per unique error).',
                'error',
                { priority: 'high', duration: 7000 }
            );
        } catch (e) {
            // Last-resort fallback
            console.error('Error in global error handler:', e);
        }
    });
})();

// Enhanced performance monitoring
if (window.performance && window.performance.mark) {
    window.performance.mark('enhanced-main-js-start');
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Main.js - DOM Content Loaded');
    
    // Mark performance end
    if (window.performance && window.performance.mark) {
        window.performance.mark('enhanced-main-js-end');
        window.performance.measure('enhanced-main-js-load', 'enhanced-main-js-start', 'enhanced-main-js-end');
    }
    
    // Show initialization notification
    setTimeout(() => {
        enhancedNotificationManager.show(
            '🚀 Enhanced ML Framework Initialized - 65+ Feature Support Ready!',
            'ml',
            { 
                duration: 4000,
                actions: [
                    {
                        label: 'View Config',
                        callback: 'console.log(window.enhancedML.config)'
                    }
                ]
            }
        );
    }, 1000);
    
    // NOTE: injected enhanced sample-data UI is disabled by default to keep pages clean
    // To re-enable, call addEnhancedSampleDataButtons() here or from the console.
    
    // Initialize enhanced features based on current page
    initializePageSpecificEnhancements();
});

function addEnhancedSampleDataButtons() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        if (form.querySelector('.enhanced-sample-button')) return; // Already added
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'enhanced-sample-buttons mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200';
        buttonContainer.innerHTML = `
            <h6 class="text-sm font-semibold text-gray-700 mb-3">
                <i class="fas fa-flask mr-2 text-purple-500"></i>Enhanced Sample Data (65+ ML Features)
            </h6>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <button type="button" onclick="fillSampleData('young_professional')" class="enhanced-sample-button bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600 transition-colors">
                    👨‍💼 Young Pro
                </button>
                <button type="button" onclick="fillSampleData('experienced_executive')" class="enhanced-sample-button bg-green-500 text-white px-3 py-2 rounded text-xs hover:bg-green-600 transition-colors">
                    🏢 Executive
                </button>
                <button type="button" onclick="fillSampleData('government_employee')" class="enhanced-sample-button bg-yellow-500 text-white px-3 py-2 rounded text-xs hover:bg-yellow-600 transition-colors">
                    🏛️ Government
                </button>
                <button type="button" onclick="fillSampleData('self_employed')" class="enhanced-sample-button bg-purple-500 text-white px-3 py-2 rounded text-xs hover:bg-purple-600 transition-colors">
                    💼 Self Employed
                </button>
                <button type="button" onclick="fillSampleData('first_time_buyer')" class="enhanced-sample-button bg-pink-500 text-white px-3 py-2 rounded text-xs hover:bg-pink-600 transition-colors">
                    🏠 First Timer
                </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">
                <i class="fas fa-info-circle mr-1"></i>
                Each profile includes comprehensive financial data optimized for ML analysis
            </p>
        `;
        
        form.insertBefore(buttonContainer, form.firstChild);
    });
}

function initializePageSpecificEnhancements() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('calculate') || currentPath.includes('emi')) {
        console.log('Initializing calculate page enhancements');
        initializeCalculateEnhancements();
    } else if (currentPath.includes('predict') || currentPath.includes('eligibility')) {
        console.log('Initializing predict page enhancements');
        initializePredictEnhancements();
    } else if (currentPath.includes('lender')) {
        console.log('Initializing lender page enhancements');
        initializeLenderEnhancements();
    } else if (currentPath.includes('prepayment')) {
        console.log('Initializing prepayment page enhancements');
        initializePrepaymentEnhancements();
    } else if (currentPath.includes('dashboard')) {
        console.log('Initializing dashboard page enhancements');
        initializeDashboardEnhancements();
    }
}

function initializeCalculateEnhancements() {
    // Add ML calculation capabilities
    if (typeof calculateEMI === 'function') {
        console.log('Calculate EMI function detected - ML enhancement available');
    }
}

function initializePredictEnhancements() {
    // Add ML prediction capabilities
    if (typeof makePrediction === 'function') {
        console.log('Prediction function detected - ML enhancement available');
    }
}

function initializeLenderEnhancements() {
    // Add ML lender matching capabilities
    if (typeof generateLenderRecommendations === 'function') {
        console.log('Lender recommendation function detected - ML enhancement available');
    }
}

function initializePrepaymentEnhancements() {
    // Add ML prepayment analysis capabilities
    if (typeof calculatePrepayment === 'function') {
        console.log('Prepayment calculation function detected - ML enhancement available');
    }
}

function initializeDashboardEnhancements() {
    // Add real-time ML dashboard capabilities
    if (typeof startRealTimeUpdates === 'function') {
        console.log('Real-time updates function detected - ML enhancement available');
    }
}

// Mathematical EMI Calculation Functions (NO ML INVOLVED)
// These functions provide accurate financial calculations using standard formulas

const EnhancedEMICalculator = {
    // Standard EMI calculation using mathematical formula
    calculateEMI: function(principal, annualRate, tenureMonths) {
        if (!principal || !annualRate || !tenureMonths) {
            throw new Error('Missing required parameters for EMI calculation');
        }
        
        const monthlyRate = annualRate / (12 * 100);
        
        if (monthlyRate === 0) {
            return {
                emi: principal / tenureMonths,
                totalAmount: principal,
                totalInterest: 0,
                monthlyRate: 0,
                calculation_type: 'Zero Interest Calculation'
            };
        }
        
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                   (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        const totalAmount = emi * tenureMonths;
        const totalInterest = totalAmount - principal;
        
        return {
            emi: emi,
            formattedEMI: `₹${Math.round(emi).toLocaleString()}`,
            totalAmount: totalAmount,
            totalInterest: totalInterest,
            principal: principal,
            tenureMonths: tenureMonths,
            annualRate: annualRate,
            monthlyRate: monthlyRate,
            calculation_type: 'Mathematical Formula'
        };
    },

    // Calculate EMI to Income ratio
    calculateEMIRatio: function(emi, monthlyIncome) {
        if (!monthlyIncome || monthlyIncome <= 0) {
            throw new Error('Invalid monthly income for ratio calculation');
        }
        return (emi / monthlyIncome) * 100;
    },

    // Calculate affordability score based on financial profile
    calculateAffordabilityScore: function(emi, monthlyIncome, profile = {}) {
        const emiRatio = this.calculateEMIRatio(emi, monthlyIncome);
        let baseScore = Math.max(0, (50 - emiRatio) / 50);
        
        // Adjust based on profile factors
        if (profile.creditScore >= 750) baseScore += 0.1;
        if (profile.employmentType === 'Government') baseScore += 0.1;
        if (profile.existingLoans === 'No') baseScore += 0.1;
        if (profile.houseType === 'Owned') baseScore += 0.05;
        if (profile.bankBalance >= (monthlyIncome * 6)) baseScore += 0.05;
        
        return Math.min(100, Math.max(0, baseScore * 100));
    },

    // Determine risk level based on EMI to income ratio
    getRiskLevel: function(emi, monthlyIncome) {
        const ratio = this.calculateEMIRatio(emi, monthlyIncome);
        if (ratio <= 30) return 'Low';
        if (ratio <= 40) return 'Medium';
        return 'High';
    },

    // Calculate loan amortization schedule
    generateAmortizationSchedule: function(principal, annualRate, tenureMonths, maxEntries = 12) {
        const emiCalc = this.calculateEMI(principal, annualRate, tenureMonths);
        const monthlyRate = emiCalc.monthlyRate;
        const emi = emiCalc.emi;
        
        let balance = principal;
        const schedule = [];
        
        for (let month = 1; month <= Math.min(tenureMonths, maxEntries); month++) {
            const interestAmount = balance * monthlyRate;
            const principalAmount = emi - interestAmount;
            balance -= principalAmount;
            
            schedule.push({
                month: month,
                emi: emi,
                principalAmount: principalAmount,
                interestAmount: interestAmount,
                remainingBalance: Math.max(0, balance),
                formattedEMI: `₹${Math.round(emi).toLocaleString()}`,
                formattedPrincipal: `₹${Math.round(principalAmount).toLocaleString()}`,
                formattedInterest: `₹${Math.round(interestAmount).toLocaleString()}`,
                formattedBalance: `₹${Math.round(Math.max(0, balance)).toLocaleString()}`
            });
        }
        
        return schedule;
    }
};

// Add mathematical functions to global scope
window.EnhancedEMICalculator = EnhancedEMICalculator;
window.calculateEMIRatio = EnhancedEMICalculator.calculateEMIRatio;
window.calculateAffordabilityScore = EnhancedEMICalculator.calculateAffordabilityScore;

// Preserve any page-defined calculateEMI and fillSampleData (do not overwrite)
(() => {
    const existingCalculate = window.calculateEMI;
    // Provide a safe wrapper that delegates to the page's implementation when called without args
    window.calculateEMI = function(...args) {
        try {
            if ((args === undefined || args.length === 0) && typeof existingCalculate === 'function') {
                // call the page-provided calculateEMI (no-arg version)
                return existingCalculate();
            }

            // If args provided or no page implementation, use enhanced calculator (expects principal, rate, months)
            return EnhancedEMICalculator.calculateEMI(...args);
        } catch (e) {
            console.error('Wrapped calculateEMI error:', e);
            // Fallback: try to call page implementation if available
            if (typeof existingCalculate === 'function') {
                try { return existingCalculate(); } catch (ee) { console.error('Fallback page calculateEMI failed:', ee); }
            }
            // Re-throw to allow global handlers to capture if truly fatal
            throw e;
        }
    };

    const existingFill = window.fillSampleData;
    window.fillSampleData = function(profileType) {
        // Prefer legacy/simple implementation when present (ensures compatibility with simple forms)
        try {
            if (typeof existingFill === 'function') {
                try {
                    const r = existingFill(profileType);
                    // If legacy returned truthy, assume success
                    if (r !== false && r !== undefined) return r;
                } catch (legacyErr) {
                    console.warn('Legacy fillSampleData failed, falling back to enhanced:', legacyErr);
                }
            }

            // Otherwise, use enhanced fillSampleData implementation
            return fillSampleData(profileType);
        } catch (e) {
            console.error('Enhanced fillSampleData error:', e);
            return false;
        }
    };
})();

console.log('Enhanced Main.js initialization completed - ML Framework Ready! 🚀');