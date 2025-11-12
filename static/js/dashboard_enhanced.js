// Enhanced Dashboard JavaScript with Real-Time ML Integration
console.log('Enhanced Dashboard.js loaded successfully');

// Enhanced real-time dashboard configuration
const enhancedDashboardConfig = {
    refreshInterval: 5000, // 5 seconds for real-time updates
    animationDuration: 1000,
    chartColors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        accent: '#8B5CF6'
    },
    mlMetrics: {
        accuracyThreshold: 0.85,
        confidenceThreshold: 0.75,
        performanceAlerts: true
    }
};

// Enhanced sample data for real-time dashboard with comprehensive metrics
const dashboardSamples = [
    {
        timestamp: new Date().toISOString(),
        totalApplications: 1247,
        approvedApplications: 892,
        pendingApplications: 245,
        rejectedApplications: 110,
        averageEMI: 18750,
        averageLoanAmount: 2350000,
        averageAge: 34,
        averageCreditScore: 742,
        mlModelAccuracy: 0.89,
        mlPredictionConfidence: 0.82,
        systemLoad: 0.45,
        apiResponseTime: 245,
        activeSessions: 67,
        conversionRate: 0.715
    },
    {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        totalApplications: 1198,
        approvedApplications: 856,
        pendingApplications: 231,
        rejectedApplications: 111,
        averageEMI: 18250,
        averageLoanAmount: 2280000,
        averageAge: 35,
        averageCreditScore: 738,
        mlModelAccuracy: 0.87,
        mlPredictionConfidence: 0.79,
        systemLoad: 0.52,
        apiResponseTime: 267,
        activeSessions: 54,
        conversionRate: 0.709
    }
];

// Enhanced notification system with priority handling
function showEnhancedNotification(message, type = 'success', priority = 'normal', duration = 5000) {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
        ml: 'bg-purple-500'
    }[type] || 'bg-blue-500';
    
    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        ml: 'fa-brain'
    }[type] || 'fa-info-circle';
    
    const priorityClass = priority === 'high' ? 'ring-4 ring-white ring-opacity-50' : '';
    
    notification.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${priorityClass}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span class="text-sm">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 text-lg leading-none">×</button>
        </div>
    `;
    
    // Insert based on priority
    if (priority === 'high') {
        container.insertBefore(notification, container.firstChild);
    } else {
        container.appendChild(notification);
    }
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Real-time data fetcher with ML metrics integration
class EnhancedRealTimeDataManager {
    constructor() {
        this.isRunning = false;
        this.intervalId = null;
        this.lastUpdate = null;
        this.errorCount = 0;
        this.maxErrors = 5;
        this.charts = {};
    }

    async start() {
        if (this.isRunning) return;
        
        console.log('Starting enhanced real-time dashboard updates...');
        this.isRunning = true;
        this.errorCount = 0;
        
        showEnhancedNotification('🚀 Real-time ML dashboard activated!', 'ml', 'high');
        
        // Initial load
        await this.fetchAndUpdateData();
        
        // Set up interval for continuous updates
        this.intervalId = setInterval(() => {
            this.fetchAndUpdateData();
        }, enhancedDashboardConfig.refreshInterval);
    }

    stop() {
        if (!this.isRunning) return;
        
        console.log('Stopping enhanced real-time dashboard updates...');
        this.isRunning = false;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        showEnhancedNotification('⏸️ Real-time updates paused', 'warning');
    }

    async fetchAndUpdateData() {
        try {
            // Simulate fetching real-time data with ML metrics
            const currentData = this.generateRealTimeData();
            
            // Update all dashboard components
            this.updateDashboardMetrics(currentData);
            this.updateCharts(currentData);
            this.updateMLPerformanceIndicators(currentData);
            this.checkAndShowAlerts(currentData);
            
            this.lastUpdate = new Date();
            this.errorCount = 0;
            
            // Update status indicator
            this.updateConnectionStatus('connected');
            
        } catch (error) {
            console.error('Error fetching real-time data:', error);
            this.errorCount++;
            
            if (this.errorCount >= this.maxErrors) {
                this.stop();
                showEnhancedNotification('❌ Real-time updates failed. Please refresh the page.', 'error', 'high');
            } else {
                this.updateConnectionStatus('error');
            }
        }
    }

    generateRealTimeData() {
        const baseData = dashboardSamples[0];
        const now = new Date();
        
        // Add realistic variations
        return {
            timestamp: now.toISOString(),
            totalApplications: baseData.totalApplications + Math.floor(Math.random() * 20) - 10,
            approvedApplications: baseData.approvedApplications + Math.floor(Math.random() * 15) - 7,
            pendingApplications: baseData.pendingApplications + Math.floor(Math.random() * 10) - 5,
            rejectedApplications: baseData.rejectedApplications + Math.floor(Math.random() * 8) - 4,
            averageEMI: baseData.averageEMI + Math.floor(Math.random() * 2000) - 1000,
            averageLoanAmount: baseData.averageLoanAmount + Math.floor(Math.random() * 200000) - 100000,
            averageAge: baseData.averageAge + (Math.random() * 4) - 2,
            averageCreditScore: Math.max(300, Math.min(850, baseData.averageCreditScore + Math.floor(Math.random() * 20) - 10)),
            mlModelAccuracy: Math.max(0.5, Math.min(1.0, baseData.mlModelAccuracy + (Math.random() * 0.06) - 0.03)),
            mlPredictionConfidence: Math.max(0.3, Math.min(1.0, baseData.mlPredictionConfidence + (Math.random() * 0.08) - 0.04)),
            systemLoad: Math.max(0.0, Math.min(1.0, baseData.systemLoad + (Math.random() * 0.2) - 0.1)),
            apiResponseTime: Math.max(50, baseData.apiResponseTime + Math.floor(Math.random() * 100) - 50),
            activeSessions: Math.max(0, baseData.activeSessions + Math.floor(Math.random() * 20) - 10),
            conversionRate: Math.max(0.0, Math.min(1.0, baseData.conversionRate + (Math.random() * 0.1) - 0.05))
        };
    }

    updateDashboardMetrics(data) {
        const updates = [
            { id: 'totalApplications', value: data.totalApplications.toLocaleString(), suffix: '' },
            { id: 'approvedApplications', value: data.approvedApplications.toLocaleString(), suffix: '' },
            { id: 'pendingApplications', value: data.pendingApplications.toLocaleString(), suffix: '' },
            { id: 'rejectedApplications', value: data.rejectedApplications.toLocaleString(), suffix: '' },
            { id: 'averageEMI', value: '₹' + data.averageEMI.toLocaleString(), suffix: '' },
            { id: 'averageLoanAmount', value: '₹' + (data.averageLoanAmount / 100000).toFixed(1), suffix: 'L' },
            { id: 'averageAge', value: data.averageAge.toFixed(1), suffix: ' years' },
            { id: 'averageCreditScore', value: Math.round(data.averageCreditScore), suffix: '' },
            { id: 'mlModelAccuracy', value: (data.mlModelAccuracy * 100).toFixed(1), suffix: '%' },
            { id: 'mlPredictionConfidence', value: (data.mlPredictionConfidence * 100).toFixed(1), suffix: '%' },
            { id: 'systemLoad', value: (data.systemLoad * 100).toFixed(1), suffix: '%' },
            { id: 'apiResponseTime', value: data.apiResponseTime, suffix: 'ms' },
            { id: 'activeSessions', value: data.activeSessions.toLocaleString(), suffix: '' },
            { id: 'conversionRate', value: (data.conversionRate * 100).toFixed(1), suffix: '%' },
            { id: 'lastUpdate', value: new Date().toLocaleTimeString(), suffix: '' }
        ];

        updates.forEach(update => {
            const element = document.getElementById(update.id);
            if (element) {
                element.textContent = update.value + update.suffix;
                
                // Add pulse animation for real-time feel
                element.classList.add('animate-pulse');
                setTimeout(() => element.classList.remove('animate-pulse'), 1000);
            }
        });

        // Update approval rate
        const approvalRate = ((data.approvedApplications / data.totalApplications) * 100).toFixed(1);
        const approvalRateElement = document.getElementById('approvalRate');
        if (approvalRateElement) {
            approvalRateElement.textContent = approvalRate + '%';
        }
    }

    updateCharts(data) {
        // Update application status chart
        this.updateApplicationStatusChart(data);
        
        // Update ML performance chart
        this.updateMLPerformanceChart(data);
        
        // Update real-time metrics chart
        this.updateRealTimeMetricsChart(data);
    }

    updateApplicationStatusChart(data) {
        const ctx = document.getElementById('applicationStatusChart');
        if (!ctx) return;

        if (!this.charts.applicationStatus) {
            this.charts.applicationStatus = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Approved', 'Pending', 'Rejected'],
                    datasets: [{
                        data: [data.approvedApplications, data.pendingApplications, data.rejectedApplications],
                        backgroundColor: [
                            enhancedDashboardConfig.chartColors.secondary,
                            enhancedDashboardConfig.chartColors.warning,
                            enhancedDashboardConfig.chartColors.danger
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1);
                                    return `${context.label}: ${context.parsed.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    animation: {
                        duration: enhancedDashboardConfig.animationDuration
                    }
                }
            });
        } else {
            this.charts.applicationStatus.data.datasets[0].data = [
                data.approvedApplications, 
                data.pendingApplications, 
                data.rejectedApplications
            ];
            this.charts.applicationStatus.update('none');
        }
    }

    updateMLPerformanceChart(data) {
        const ctx = document.getElementById('mlPerformanceChart');
        if (!ctx) return;

        if (!this.charts.mlPerformance) {
            this.charts.mlPerformance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['10m ago', '8m ago', '6m ago', '4m ago', '2m ago', 'Now'],
                    datasets: [{
                        label: 'ML Accuracy',
                        data: [0.85, 0.87, 0.86, 0.88, 0.89, data.mlModelAccuracy],
                        borderColor: enhancedDashboardConfig.chartColors.accent,
                        backgroundColor: enhancedDashboardConfig.chartColors.accent + '20',
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Prediction Confidence',
                        data: [0.78, 0.80, 0.79, 0.81, 0.82, data.mlPredictionConfidence],
                        borderColor: enhancedDashboardConfig.chartColors.primary,
                        backgroundColor: enhancedDashboardConfig.chartColors.primary + '20',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0.7,
                            max: 1.0,
                            ticks: {
                                callback: function(value) {
                                    return (value * 100).toFixed(0) + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    animation: {
                        duration: enhancedDashboardConfig.animationDuration
                    }
                }
            });
        } else {
            // Shift data and add new point
            this.charts.mlPerformance.data.datasets[0].data.shift();
            this.charts.mlPerformance.data.datasets[0].data.push(data.mlModelAccuracy);
            this.charts.mlPerformance.data.datasets[1].data.shift();
            this.charts.mlPerformance.data.datasets[1].data.push(data.mlPredictionConfidence);
            this.charts.mlPerformance.update('none');
        }
    }

    updateRealTimeMetricsChart(data) {
        const ctx = document.getElementById('realTimeMetricsChart');
        if (!ctx) return;

        if (!this.charts.realTimeMetrics) {
            this.charts.realTimeMetrics = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['System Load', 'Conversion Rate', 'API Response'],
                    datasets: [{
                        data: [
                            data.systemLoad * 100, 
                            data.conversionRate * 100, 
                            (data.apiResponseTime / 10) // Scale for visibility
                        ],
                        backgroundColor: [
                            data.systemLoad > 0.8 ? enhancedDashboardConfig.chartColors.danger : enhancedDashboardConfig.chartColors.secondary,
                            data.conversionRate > 0.7 ? enhancedDashboardConfig.chartColors.secondary : enhancedDashboardConfig.chartColors.warning,
                            data.apiResponseTime > 300 ? enhancedDashboardConfig.chartColors.danger : enhancedDashboardConfig.chartColors.primary
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    if (context.dataIndex === 0) return `System Load: ${data.systemLoad.toFixed(2)}%`;
                                    if (context.dataIndex === 1) return `Conversion Rate: ${(data.conversionRate * 100).toFixed(1)}%`;
                                    if (context.dataIndex === 2) return `API Response: ${data.apiResponseTime}ms`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    },
                    animation: {
                        duration: enhancedDashboardConfig.animationDuration
                    }
                }
            });
        } else {
            this.charts.realTimeMetrics.data.datasets[0].data = [
                data.systemLoad * 100, 
                data.conversionRate * 100, 
                (data.apiResponseTime / 10)
            ];
            this.charts.realTimeMetrics.data.datasets[0].backgroundColor = [
                data.systemLoad > 0.8 ? enhancedDashboardConfig.chartColors.danger : enhancedDashboardConfig.chartColors.secondary,
                data.conversionRate > 0.7 ? enhancedDashboardConfig.chartColors.secondary : enhancedDashboardConfig.chartColors.warning,
                data.apiResponseTime > 300 ? enhancedDashboardConfig.chartColors.danger : enhancedDashboardConfig.chartColors.primary
            ];
            this.charts.realTimeMetrics.update('none');
        }
    }

    updateMLPerformanceIndicators(data) {
        // Update ML accuracy indicator
        const accuracyIndicator = document.getElementById('mlAccuracyIndicator');
        if (accuracyIndicator) {
            const accuracy = data.mlModelAccuracy;
            accuracyIndicator.className = `inline-block w-3 h-3 rounded-full mr-2 ${
                accuracy >= enhancedDashboardConfig.mlMetrics.accuracyThreshold ? 'bg-green-500' : 
                accuracy >= 0.75 ? 'bg-yellow-500' : 'bg-red-500'
            }`;
        }

        // Update confidence indicator
        const confidenceIndicator = document.getElementById('mlConfidenceIndicator');
        if (confidenceIndicator) {
            const confidence = data.mlPredictionConfidence;
            confidenceIndicator.className = `inline-block w-3 h-3 rounded-full mr-2 ${
                confidence >= enhancedDashboardConfig.mlMetrics.confidenceThreshold ? 'bg-green-500' : 
                confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
            }`;
        }

        // Update system health indicator
        const systemHealthIndicator = document.getElementById('systemHealthIndicator');
        if (systemHealthIndicator) {
            const isHealthy = data.systemLoad < 0.8 && data.apiResponseTime < 300;
            systemHealthIndicator.className = `inline-block w-3 h-3 rounded-full mr-2 ${
                isHealthy ? 'bg-green-500' : 'bg-red-500'
            }`;
        }
    }

    updateConnectionStatus(status) {
        const statusIndicator = document.getElementById('connectionStatus');
        if (statusIndicator) {
            const statusConfig = {
                connected: { text: 'Live', class: 'bg-green-500 text-white', icon: 'fa-wifi' },
                error: { text: 'Error', class: 'bg-red-500 text-white', icon: 'fa-exclamation-triangle' },
                disconnected: { text: 'Offline', class: 'bg-gray-500 text-white', icon: 'fa-wifi-slash' }
            };
            
            const config = statusConfig[status] || statusConfig.disconnected;
            statusIndicator.className = `px-3 py-1 rounded-full text-xs font-semibold ${config.class}`;
            statusIndicator.innerHTML = `<i class="fas ${config.icon} mr-1"></i>${config.text}`;
        }
    }

    checkAndShowAlerts(data) {
        if (!enhancedDashboardConfig.mlMetrics.performanceAlerts) return;

        // ML accuracy alert
        if (data.mlModelAccuracy < enhancedDashboardConfig.mlMetrics.accuracyThreshold) {
            showEnhancedNotification(
                `⚠️ ML model accuracy dropped to ${(data.mlModelAccuracy * 100).toFixed(1)}%`,
                'warning',
                'high'
            );
        }

        // System load alert
        if (data.systemLoad > 0.9) {
            showEnhancedNotification(
                `🚨 High system load: ${(data.systemLoad * 100).toFixed(1)}%`,
                'error',
                'high'
            );
        }

        // API response time alert
        if (data.apiResponseTime > 500) {
            showEnhancedNotification(
                `🐌 Slow API response: ${data.apiResponseTime}ms`,
                'warning',
                'high'
            );
        }

        // Low conversion rate alert
        if (data.conversionRate < 0.6) {
            showEnhancedNotification(
                `📉 Low conversion rate: ${(data.conversionRate * 100).toFixed(1)}%`,
                'warning'
            );
        }
    }
}

// Enhanced dashboard functions
let enhancedDataManager = null;

function startRealTimeUpdates() {
    if (!enhancedDataManager) {
        enhancedDataManager = new EnhancedRealTimeDataManager();
    }
    enhancedDataManager.start();
}

function stopRealTimeUpdates() {
    if (enhancedDataManager) {
        enhancedDataManager.stop();
    }
}

function refreshDashboard() {
    showEnhancedNotification('🔄 Refreshing dashboard data...', 'info');
    
    if (enhancedDataManager) {
        enhancedDataManager.fetchAndUpdateData();
    } else {
        // Manual refresh if real-time is not active
        setTimeout(() => {
            showEnhancedNotification('✅ Dashboard refreshed successfully!', 'success');
            location.reload();
        }, 1000);
    }
}

function exportDashboardData() {
    showEnhancedNotification('📊 Preparing dashboard export...', 'info');
    
    const currentData = enhancedDataManager ? 
        enhancedDataManager.generateRealTimeData() : 
        dashboardSamples[0];
    
    const exportData = {
        timestamp: new Date().toISOString(),
        dashboardMetrics: currentData,
        mlPerformance: {
            accuracy: currentData.mlModelAccuracy,
            confidence: currentData.mlPredictionConfidence,
            thresholds: enhancedDashboardConfig.mlMetrics
        },
        systemHealth: {
            load: currentData.systemLoad,
            responseTime: currentData.apiResponseTime,
            activeSessions: currentData.activeSessions
        }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard_export_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showEnhancedNotification('💾 Dashboard data exported successfully!', 'success');
}

// Enhanced sample data filling for dashboard testing
function fillDashboardSampleData() {
    console.log('Enhanced fillDashboardSampleData called');
    
    showEnhancedNotification('🧪 Loading comprehensive sample dashboard data...', 'info');
    
    setTimeout(() => {
        const sampleData = dashboardSamples[0];
        
        // Simulate data filling in dashboard elements
        Object.keys(sampleData).forEach(key => {
            const element = document.getElementById(key);
            if (element && typeof sampleData[key] === 'number') {
                element.textContent = sampleData[key].toLocaleString();
            }
        });
        
        showEnhancedNotification('✅ Sample data loaded with real-time metrics!', 'success');
        
        // Auto-start real-time updates
        if (!enhancedDataManager || !enhancedDataManager.isRunning) {
            startRealTimeUpdates();
        }
    }, 1500);
}

// Make enhanced functions globally available
window.startRealTimeUpdates = startRealTimeUpdates;
window.stopRealTimeUpdates = stopRealTimeUpdates;
window.refreshDashboard = refreshDashboard;
window.exportDashboardData = exportDashboardData;
window.fillDashboardSampleData = fillDashboardSampleData;

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Dashboard JavaScript initialized with comprehensive ML integration');
    
    // Initialize enhanced dashboard
    if (document.getElementById('dashboardContainer') || document.querySelector('.dashboard')) {
        showEnhancedNotification('🎯 Enhanced ML Dashboard ready!', 'ml');
        
        // Add enhanced control buttons if dashboard exists
        addEnhancedDashboardControls();
        
        // Auto-start real-time updates if configured
        if (enhancedDashboardConfig.autoStart !== false) {
            setTimeout(startRealTimeUpdates, 2000);
        }
    }
});

function addEnhancedDashboardControls() {
    const dashboard = document.getElementById('dashboardContainer') || document.querySelector('.dashboard');
    if (!dashboard || document.getElementById('enhancedDashboardControls')) return;
    
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'enhancedDashboardControls';
    controlsDiv.className = 'bg-white p-4 rounded-lg shadow-lg mb-6';
    controlsDiv.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
                <h3 class="text-lg font-semibold text-gray-800">
                    <i class="fas fa-tachometer-alt mr-2 text-blue-500"></i>Enhanced ML Dashboard
                </h3>
                <div id="connectionStatus" class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
                    <i class="fas fa-wifi-slash mr-1"></i>Offline
                </div>
            </div>
            
            <div class="flex items-center space-x-2">
                <div class="text-xs text-gray-500">
                    <div id="mlAccuracyIndicator" class="inline-block w-3 h-3 rounded-full mr-2 bg-gray-400"></div>ML Accuracy
                </div>
                <div class="text-xs text-gray-500">
                    <div id="mlConfidenceIndicator" class="inline-block w-3 h-3 rounded-full mr-2 bg-gray-400"></div>Confidence
                </div>
                <div class="text-xs text-gray-500">
                    <div id="systemHealthIndicator" class="inline-block w-3 h-3 rounded-full mr-2 bg-gray-400"></div>System Health
                </div>
            </div>
            
            <div class="flex items-center space-x-2">
                <button onclick="startRealTimeUpdates()" class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                    <i class="fas fa-play mr-1"></i>Start Live
                </button>
                <button onclick="stopRealTimeUpdates()" class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                    <i class="fas fa-pause mr-1"></i>Pause
                </button>
                <button onclick="refreshDashboard()" class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    <i class="fas fa-sync-alt mr-1"></i>Refresh
                </button>
                <button onclick="fillDashboardSampleData()" class="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                    <i class="fas fa-database mr-1"></i>Sample Data
                </button>
                <button onclick="exportDashboardData()" class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    <i class="fas fa-download mr-1"></i>Export
                </button>
            </div>
        </div>
        
        <div class="mt-3 text-xs text-gray-500">
            Last Update: <span id="lastUpdate">Never</span> | 
            Refresh Interval: ${enhancedDashboardConfig.refreshInterval / 1000}s | 
            Auto-refresh: ${enhancedDashboardConfig.autoStart !== false ? 'Enabled' : 'Disabled'}
        </div>
    `;
    
    dashboard.insertBefore(controlsDiv, dashboard.firstChild);
}

// Enhanced window error handling
window.addEventListener('error', function(event) {
    console.error('Enhanced dashboard error:', event.error);
    showEnhancedNotification('⚠️ Dashboard error detected. Check console for details.', 'error');
});

// Enhanced visibility change handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Dashboard hidden, pausing updates...');
        if (enhancedDataManager && enhancedDataManager.isRunning) {
            enhancedDataManager.stop();
        }
    } else {
        console.log('Dashboard visible, resuming updates...');
        if (enhancedDataManager && !enhancedDataManager.isRunning) {
            enhancedDataManager.start();
        }
    }
});