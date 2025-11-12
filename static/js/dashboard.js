// Real-time Dashboard JavaScript
console.log('Dashboard.js loaded successfully');

// Global chart instances
let predictionsChart = null;
let performanceChart = null;
let accuracyChart = null;

// Initialize charts
function initializeCharts() {
    console.log('Initializing dashboard charts...');
    
    // Predictions Timeline Chart
    const predictionsCtx = document.getElementById('predictionsChart');
    if (predictionsCtx) {
        predictionsChart = new Chart(predictionsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Classification Predictions',
                        data: [],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Regression Predictions',
                        data: [],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Predictions Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // System Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'System Load (%)',
                        data: [],
                        borderColor: 'rgb(245, 158, 11)',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Response Time (ms)',
                        data: [],
                        borderColor: 'rgb(168, 85, 247)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'System Performance Metrics'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        max: 100
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }
}

// Update charts with new data
function updateCharts(data) {
    const currentTime = new Date().toLocaleTimeString();
    
    // Update predictions chart
    if (predictionsChart && data.real_time_data) {
        const chartData = predictionsChart.data;
        chartData.labels.push(currentTime);
        
        // Keep only last 20 data points
        if (chartData.labels.length > 20) {
            chartData.labels.shift();
            chartData.datasets.forEach(dataset => dataset.data.shift());
        }
        
        // Add new data points
        chartData.datasets[0].data.push(data.real_time_data.predictions_per_minute || 0);
        chartData.datasets[1].data.push((data.real_time_data.predictions_per_minute || 0) * 0.7); // Simulate regression data
        
        predictionsChart.update('none');
    }
    
    // Update performance chart
    if (performanceChart && data.real_time_data) {
        const chartData = performanceChart.data;
        chartData.labels.push(currentTime);
        
        // Keep only last 20 data points
        if (chartData.labels.length > 20) {
            chartData.labels.shift();
            chartData.datasets.forEach(dataset => dataset.data.shift());
        }
        
        // Add new data points
        chartData.datasets[0].data.push(data.real_time_data.system_load || 0);
        chartData.datasets[1].data.push((data.system_stats.avg_prediction_time || 0) * 1000);
        
        performanceChart.update('none');
    }
}

// Update recent predictions table
function updateRecentPredictions(predictions) {
    const tableBody = document.getElementById('recentPredictionsTable');
    if (!tableBody || !predictions) return;
    
    if (predictions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                    No recent predictions available
                </td>
            </tr>
        `;
        return;
    }
    
    // Show last 10 predictions
    const recentPredictions = predictions.slice(-10).reverse();
    
    tableBody.innerHTML = recentPredictions.map(prediction => {
        const result = prediction.result;
        const timestamp = new Date(result.timestamp).toLocaleString();
        const modelType = result.model_type === 'classification' ? 'Classification' : 'Regression';
        const predictionValue = result.prediction || result.formatted_amount || 'N/A';
        const confidence = result.confidence ? (result.confidence * 100).toFixed(1) + '%' : 'N/A';
        const responseTime = result.prediction_time ? (result.prediction_time * 1000).toFixed(0) + 'ms' : 'N/A';
        
        return `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-2 text-sm text-gray-600">${timestamp}</td>
                <td class="px-4 py-2">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${modelType === 'Classification' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                        ${modelType}
                    </span>
                </td>
                <td class="px-4 py-2 text-sm font-medium text-gray-900">${predictionValue}</td>
                <td class="px-4 py-2 text-sm text-gray-600">${confidence}</td>
                <td class="px-4 py-2 text-sm text-gray-600">${responseTime}</td>
            </tr>
        `;
    }).join('');
}

// Refresh predictions manually
function refreshPredictions() {
    showNotification('Refreshing predictions...', 'info');
    loadDashboardData();
}

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
            <i class="fas fa-info-circle mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Generate sample predictions for testing
function generateSamplePredictions() {
    showNotification('Generating sample predictions...', 'info');
    
    fetch('/api/generate_sample_predictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({count: 5})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification(`Generated ${data.count} sample predictions!`, 'success');
            setTimeout(loadDashboardData, 1000); // Refresh after 1 second
        } else {
            showNotification('Failed to generate sample predictions', 'error');
        }
    })
    .catch(error => {
        console.error('Error generating sample predictions:', error);
        showNotification('Error generating sample predictions', 'error');
    });
}

// Export functions for global access
window.refreshPredictions = refreshPredictions;
window.generateSamplePredictions = generateSamplePredictions;
window.initializeCharts = initializeCharts;
window.updateCharts = updateCharts;
window.updateRecentPredictions = updateRecentPredictions;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard page JavaScript initialized');
    
    // Add sample generation button if dashboard page
    if (window.location.pathname.includes('dashboard')) {
        const header = document.querySelector('.bg-gradient-to-r');
        if (header) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'mt-4';
            buttonContainer.innerHTML = `
                <button onclick="generateSamplePredictions()" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                    <i class="fas fa-magic mr-2"></i>Generate Sample Data
                </button>
            `;
            header.appendChild(buttonContainer);
        }
    }
});