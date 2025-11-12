// Real-time Enhanced Integration Monitor
class EnhancedIntegrationMonitor {
    constructor() {
        this.metrics = {
            apiCalls: 0,
            successfulPredictions: 0,
            failedPredictions: 0,
            averageResponseTime: 0,
            enhancedFeaturesUsed: 0,
            pageViews: {
                calculate: 0,
                predict: 0,
                lenders: 0,
                prepayment: 0,
                dashboard: 0,
                whatif: 0
            }
        };
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.trackPageView();
        this.monitorAPICalls();
        this.trackEnhancedFeatures();
        this.setupRealTimeUpdates();
        console.log('🚀 Enhanced Integration Monitor activated');
    }

    trackPageView() {
        const page = window.location.pathname.split('/')[1] || 'index';
        if (this.metrics.pageViews.hasOwnProperty(page)) {
            this.metrics.pageViews[page]++;
        }
        this.logMetric('page_view', { page, timestamp: new Date().toISOString() });
    }

    monitorAPICalls() {
        // Override fetch to monitor API calls
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = async function(...args) {
            const startTime = performance.now();
            self.metrics.apiCalls++;
            
            try {
                const response = await originalFetch.apply(this, args);
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                
                // Update average response time
                self.metrics.averageResponseTime = 
                    (self.metrics.averageResponseTime + responseTime) / 2;
                
                if (response.ok && args[0].includes('/api/predict')) {
                    self.metrics.successfulPredictions++;
                } else if (!response.ok && args[0].includes('/api/predict')) {
                    self.metrics.failedPredictions++;
                }
                
                self.logMetric('api_call', {
                    url: args[0],
                    method: args[1]?.method || 'GET',
                    status: response.status,
                    responseTime: responseTime,
                    timestamp: new Date().toISOString()
                });
                
                return response;
            } catch (error) {
                if (args[0].includes('/api/predict')) {
                    self.metrics.failedPredictions++;
                }
                self.logMetric('api_error', {
                    url: args[0],
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
                throw error;
            }
        };
    }

    trackEnhancedFeatures() {
        // Track usage of enhanced features
        const enhancedFeatures = [
            'EMICalculator',
            'MLPredictor',
            'LenderMatcher',
            'PrepaymentAnalyzer',
            'DashboardAnalytics'
        ];

        enhancedFeatures.forEach(feature => {
            if (window[feature]) {
                this.metrics.enhancedFeaturesUsed++;
                this.logMetric('enhanced_feature_loaded', {
                    feature,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    setupRealTimeUpdates() {
        setInterval(() => {
            this.updateDashboard();
            this.checkPerformanceThresholds();
        }, 5000); // Update every 5 seconds
    }

    updateDashboard() {
        // Update dashboard with current metrics
        const uptimeHours = (Date.now() - this.startTime) / (1000 * 60 * 60);
        const successRate = this.metrics.apiCalls > 0 ? 
            (this.metrics.successfulPredictions / this.metrics.apiCalls * 100).toFixed(1) : 0;

        const dashboardData = {
            uptime: uptimeHours.toFixed(2),
            totalApiCalls: this.metrics.apiCalls,
            successRate: successRate,
            averageResponseTime: this.metrics.averageResponseTime.toFixed(2),
            enhancedFeaturesActive: this.metrics.enhancedFeaturesUsed,
            ...this.metrics.pageViews
        };

        // Store dashboard data for real-time access
        localStorage.setItem('enhancedIntegrationMetrics', JSON.stringify(dashboardData));
        
        // Emit custom event for dashboard updates
        window.dispatchEvent(new CustomEvent('enhancedMetricsUpdate', {
            detail: dashboardData
        }));
    }

    checkPerformanceThresholds() {
        const alerts = [];
        
        if (this.metrics.averageResponseTime > 2000) {
            alerts.push({
                type: 'warning',
                message: `High API response time: ${this.metrics.averageResponseTime.toFixed(2)}ms`,
                timestamp: new Date().toISOString()
            });
        }
        
        const errorRate = this.metrics.apiCalls > 0 ? 
            (this.metrics.failedPredictions / this.metrics.apiCalls * 100) : 0;
        
        if (errorRate > 5) {
            alerts.push({
                type: 'error',
                message: `High error rate: ${errorRate.toFixed(1)}%`,
                timestamp: new Date().toISOString()
            });
        }
        
        if (this.metrics.enhancedFeaturesUsed < 3) {
            alerts.push({
                type: 'info',
                message: 'Some enhanced features may not be loaded',
                timestamp: new Date().toISOString()
            });
        }

        if (alerts.length > 0) {
            localStorage.setItem('performanceAlerts', JSON.stringify(alerts));
            console.warn('Performance alerts:', alerts);
        }
    }

    logMetric(eventType, data) {
        // Log metrics for analysis
        const logEntry = {
            eventType,
            data,
            sessionId: this.getSessionId(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Store in local storage for persistence
        const logs = JSON.parse(localStorage.getItem('integrationLogs') || '[]');
        logs.push(logEntry);
        
        // Keep only last 1000 entries
        if (logs.length > 1000) {
            logs.splice(0, logs.length - 1000);
        }
        
        localStorage.setItem('integrationLogs', JSON.stringify(logs));
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('enhancedIntegrationSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('enhancedIntegrationSessionId', sessionId);
        }
        return sessionId;
    }

    getMetrics() {
        return {
            ...this.metrics,
            uptime: (Date.now() - this.startTime) / 1000,
            successRate: this.metrics.apiCalls > 0 ? 
                (this.metrics.successfulPredictions / this.metrics.apiCalls * 100) : 0
        };
    }

    exportLogs() {
        const logs = localStorage.getItem('integrationLogs');
        const metrics = this.getMetrics();
        
        const exportData = {
            metrics,
            logs: JSON.parse(logs || '[]'),
            exportTime: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], 
            { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `enhanced_integration_logs_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Auto-initialize the monitor
if (typeof window !== 'undefined') {
    window.enhancedIntegrationMonitor = new EnhancedIntegrationMonitor();
    
    // Add export function to window for easy access
    window.exportIntegrationLogs = () => {
        window.enhancedIntegrationMonitor.exportLogs();
    };
    
    // Add metrics access function
    window.getIntegrationMetrics = () => {
        return window.enhancedIntegrationMonitor.getMetrics();
    };
}

console.log('🔧 Enhanced Integration Monitor loaded successfully');
console.log('📊 Access metrics with: getIntegrationMetrics()');
console.log('📁 Export logs with: exportIntegrationLogs()');