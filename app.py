"""
EMI Risk Assessment Flask Web Application
A modern, responsive web platform for EMI eligibility prediction and financial risk assessment.
"""

from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
import pandas as pd
import numpy as np
import joblib
import sqlite3
import json
import os
from datetime import datetime
import logging
from sklearn.preprocessing import StandardScaler, LabelEncoder
import plotly.graph_objects as go
import plotly.express as px
from plotly.utils import PlotlyJSONEncoder

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production
app.config['JSON_SORT_KEYS'] = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for models and scalers
models = {}
scalers = {}
label_encoder = None
feature_names = {}

def load_models():
    """Load trained models and preprocessing objects"""
    global models, scalers, label_encoder, feature_names
    
    try:
        models['classification'] = joblib.load('models/classification_model.pkl')
        models['regression'] = joblib.load('models/regression_model.pkl')
        scalers['classification'] = joblib.load('models/scaler_classification.pkl')
        scalers['regression'] = joblib.load('models/scaler_regression.pkl')
        label_encoder = joblib.load('models/label_encoder.pkl')
        feature_names = joblib.load('models/feature_names.pkl')
        logger.info("Models loaded successfully")
        return True
    except Exception as e:
        logger.error(f"Error loading models: {str(e)}")
        return False

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect('financial_data.db')
    conn.row_factory = sqlite3.Row
    return conn

def engineer_features(input_data):
    """Apply feature engineering to input data"""
    df = pd.DataFrame([input_data])
    
    # Convert string values to appropriate types
    numeric_columns = ['age', 'monthly_salary', 'years_of_employment', 'family_size', 'dependents',
                       'monthly_rent', 'school_fees', 'college_fees', 'travel_expenses',
                       'groceries_utilities', 'other_monthly_expenses', 'current_emi_amount',
                       'credit_score', 'bank_balance', 'emergency_fund', 'requested_amount',
                       'requested_tenure']
    
    for col in numeric_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Financial Ratios
    df['debt_to_income_ratio'] = np.where(df['monthly_salary'] > 0, 
                                          (df['current_emi_amount'] / df['monthly_salary']) * 100, 0)
    
    df['savings_ratio'] = np.where(df['monthly_salary'] > 0,
                                   (df['bank_balance'] + df['emergency_fund']) / df['monthly_salary'], 0)
    
    df['total_monthly_expenses'] = (df['monthly_rent'] + df['school_fees'] + 
                                    df['college_fees'] + df['travel_expenses'] +
                                    df['groceries_utilities'] + df['other_monthly_expenses'])
    
    df['expense_to_income_ratio'] = np.where(df['monthly_salary'] > 0,
                                             (df['total_monthly_expenses'] / df['monthly_salary']) * 100, 0)
    
    df['disposable_income'] = df['monthly_salary'] - df['total_monthly_expenses'] - df['current_emi_amount']
    
    df['requested_to_income_ratio'] = np.where(df['monthly_salary'] > 0,
                                               df['requested_amount'] / df['monthly_salary'], 0)
    
    df['financial_buffer_score'] = np.where(df['requested_amount'] > 0,
                                            (df['bank_balance'] + df['emergency_fund']) / df['requested_amount'], 0)
    
    # Categorical features
    df['age_group'] = pd.cut(df['age'], bins=[0, 25, 35, 45, 55, 100], 
                             labels=['Young', 'Young_Adult', 'Middle_Age', 'Senior', 'Elder'])
    
    # Income categories
    df['income_category'] = pd.cut(df['monthly_salary'],
                                   bins=[0, 30000, 50000, 80000, np.inf],
                                   labels=['Low_Income', 'Medium_Income', 'High_Income', 'Very_High_Income'])
    
    # Credit score categories
    df['credit_category'] = pd.cut(df['credit_score'],
                                   bins=[0, 600, 700, 750, 850],
                                   labels=['Poor', 'Fair', 'Good', 'Excellent'])
    
    # Family size categories
    df['family_size_category'] = pd.cut(df['family_size'],
                                        bins=[0, 2, 4, 6, 20],
                                        labels=['Small', 'Medium', 'Large', 'Very_Large'])
    
    # Interaction features
    employment_mapping = {'Government': 4, 'Private': 3, 'Self_Employed': 2, 'Contract': 1}
    df['employment_stability'] = df['employment_type'].map(employment_mapping).fillna(1)
    
    education_mapping = {'Graduate': 4, 'Post_Graduate': 5, 'Undergraduate': 3, 'High_School': 2, 'Others': 1}
    df['education_score'] = df['education'].map(education_mapping).fillna(1)
    
    house_mapping = {'Owned': 3, 'Rented': 1, 'Family': 2}
    df['house_ownership_score'] = df['house_type'].map(house_mapping).fillna(1)
    
    # Risk score
    df['risk_score'] = (
        df['debt_to_income_ratio'] * 0.3 +
        df['expense_to_income_ratio'] * 0.2 +
        (100 - df['credit_score']/8.5) * 0.25 +
        (1/df['employment_stability']) * 10 * 0.15 +
        (1/df['education_score']) * 10 * 0.1
    )
    
    return df

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/predict')
def predict_form():
    """EMI prediction form page"""
    return render_template('predict.html')

@app.route('/calculate')
def calculate():
    """EMI Calculator page"""
    return render_template('calculate.html')

@app.route('/whatif')
def whatif():
    """What-if analysis page"""
    return render_template('whatif.html')
@app.route('/prepayment')
def prepayment():
    """Prepayment analysis page"""
    return render_template('prepayment.html')

@app.route('/dashboard')
def dashboard():
    """Analytics dashboard"""
    try:
        conn = get_db_connection()
        
        # Get basic statistics
        stats = {}
        cursor = conn.cursor()
        
        # Total records
        cursor.execute("SELECT COUNT(*) FROM financial_records")
        stats['total_records'] = cursor.fetchone()[0]
        
        # Eligibility breakdown
        cursor.execute("SELECT emi_eligibility, COUNT(*) FROM financial_records GROUP BY emi_eligibility")
        eligibility_data = cursor.fetchall()
        stats['eligibility_breakdown'] = {row[0]: row[1] for row in eligibility_data}
        
        # Average metrics
        cursor.execute("SELECT AVG(monthly_salary), AVG(credit_score), AVG(max_monthly_emi) FROM financial_records")
        avg_data = cursor.fetchone()
        stats['avg_salary'] = avg_data[0] or 0
        stats['avg_credit_score'] = avg_data[1] or 0
        stats['avg_emi'] = avg_data[2] or 0
        
        conn.close()
        
        return render_template('dashboard.html', stats=stats)
    except Exception as e:
        logger.error(f"Dashboard error: {str(e)}")
        flash(f'Error loading dashboard: {str(e)}', 'error')
        return render_template('dashboard.html', stats={})

@app.route('/realtime-dashboard')
def realtime_dashboard():
    """Real-time ML dashboard with live metrics and monitoring"""
    return render_template('realtime_dashboard.html')

@app.route('/records')
def records():
    """View customer records"""
    try:
        conn = get_db_connection()
        page = request.args.get('page', 1, type=int)
        per_page = 20
        offset = (page - 1) * per_page
        
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM financial_records")
        total = cursor.fetchone()[0]
        
        cursor.execute(f"""
            SELECT id, age, gender, monthly_salary, credit_score, emi_eligibility, 
                   max_monthly_emi, prediction_date 
            FROM financial_records 
            LIMIT {per_page} OFFSET {offset}
        """)
        
        records_data = cursor.fetchall()
        conn.close()
        
        # Convert to list of dictionaries
        records_list = []
        for row in records_data:
            records_list.append({
                'id': row[0],
                'age': row[1],
                'gender': row[2],
                'monthly_salary': row[3],
                'credit_score': row[4],
                'emi_eligibility': row[5],
                'max_monthly_emi': row[6],
                'prediction_date': row[7]
            })
        
        has_prev = page > 1
        has_next = offset + per_page < total
        
        return render_template('records.html', 
                             records=records_list,
                             page=page,
                             has_prev=has_prev,
                             has_next=has_next,
                             total=total)
    except Exception as e:
        logger.error(f"Records error: {str(e)}")
        flash(f'Error loading records: {str(e)}', 'error')
        return render_template('records.html', records=[])

@app.route('/api/predict/eligibility', methods=['POST'])
def predict_eligibility():
    """API endpoint for EMI eligibility prediction"""
    try:
        data = request.get_json()
        from real_time_manager import real_time_manager

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Delegate to the real-time manager so that statistics and recent predictions are updated
        result = real_time_manager.predict_emi_eligibility(data)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Eligibility prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/emi_amount', methods=['POST'])
def predict_emi_amount():
    """API endpoint for EMI amount prediction"""
    try:
        data = request.get_json()
        from real_time_manager import real_time_manager

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Delegate to the real-time manager so that statistics and recent predictions are updated
        result = real_time_manager.predict_emi_amount(data)
        return jsonify(result)

    except Exception as e:
        logger.error(f"EMI amount prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/comprehensive', methods=['POST'])
def comprehensive_prediction():
    """API endpoint for comprehensive risk assessment"""
    try:
        data = request.get_json()
        
        # Get eligibility prediction
        eligibility_response = predict_eligibility()
        if eligibility_response.status_code != 200:
            return eligibility_response

        eligibility_result = eligibility_response.get_json()

        # Normalize eligibility result into canonical shape expected by the front-end
        canonical_eligibility = {
            'eligibility': 'Not Eligible',
            'confidence': 0.0
        }

        try:
            if isinstance(eligibility_result, dict):
                # label could be present as 'eligibility', 'eligibility_status' or 'prediction'
                label = eligibility_result.get('eligibility') or eligibility_result.get('eligibility_status') or eligibility_result.get('prediction')
                conf = eligibility_result.get('confidence') if 'confidence' in eligibility_result else (
                    eligibility_result.get('prediction_probability') or eligibility_result.get('prediction_prob') or None
                )

                if label:
                    # Normalize common labels (strings like 'Eligible', 'Not Eligible', 'Not_Eligible')
                    label_norm = str(label).replace('_', ' ').strip()
                    canonical_eligibility['eligibility'] = 'Eligible' if label_norm.lower() in ('eligible', 'approved', 'yes') else ('Conditional' if label_norm.lower() in ('conditional', 'review') else 'Not Eligible')

                if isinstance(conf, (int, float)):
                    # Convert fraction (0-1) to percent if needed
                    if conf <= 1:
                        canonical_eligibility['confidence'] = round(float(conf) * 100, 2)
                    else:
                        canonical_eligibility['confidence'] = round(float(conf), 2)
        except Exception as e:
            logger.warning(f"Could not normalize eligibility_result: {e}")

        result = {
            'eligibility': canonical_eligibility,
            'eligibility_raw': eligibility_result,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        # If eligible, get EMI amount prediction
        if canonical_eligibility['eligibility'] == 'Eligible':
            emi_response = predict_emi_amount()
            if emi_response.status_code == 200:
                emi_result = emi_response.get_json()
                result['emi_prediction'] = emi_result

                # Determine risk level using emi_to_income_ratio if available
                emi_ratio = None
                try:
                    emi_ratio = float(emi_result.get('emi_to_income_ratio'))
                except Exception:
                    pass

                if emi_ratio is not None:
                    if emi_ratio < 30:
                        result['risk_level'] = 'Low'
                    elif emi_ratio < 45:
                        result['risk_level'] = 'Moderate'
                    else:
                        result['risk_level'] = 'High'
                else:
                    result['risk_level'] = 'Unknown'
            else:
                result['emi_prediction'] = None
                result['risk_level'] = 'Unknown'
        else:
            result['emi_prediction'] = None
            result['risk_level'] = 'High'
            result['recommendation'] = 'Not eligible for EMI. Consider improving credit score or reducing existing debt.'
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Comprehensive prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/save_record', methods=['POST'])
def save_record():
    """Save prediction result to database"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert new record
        cursor.execute("""
            INSERT INTO financial_records 
            (age, gender, marital_status, education, monthly_salary, employment_type,
             years_of_employment, company_type, house_type, monthly_rent, family_size,
             dependents, school_fees, college_fees, travel_expenses, groceries_utilities,
             other_monthly_expenses, existing_loans, current_emi_amount, credit_score,
             bank_balance, emergency_fund, emi_scenario, requested_amount, requested_tenure,
             predicted_eligibility, predicted_emi_amount)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('age'), data.get('gender'), data.get('marital_status'),
            data.get('education'), data.get('monthly_salary'), data.get('employment_type'),
            data.get('years_of_employment'), data.get('company_type'), data.get('house_type'),
            data.get('monthly_rent'), data.get('family_size'), data.get('dependents'),
            data.get('school_fees'), data.get('college_fees'), data.get('travel_expenses'),
            data.get('groceries_utilities'), data.get('other_monthly_expenses'),
            data.get('existing_loans'), data.get('current_emi_amount'), data.get('credit_score'),
            data.get('bank_balance'), data.get('emergency_fund'), data.get('emi_scenario'),
            data.get('requested_amount'), data.get('requested_tenure'),
            data.get('predicted_eligibility'), data.get('predicted_emi_amount')
        ))
        
        conn.commit()
        record_id = cursor.lastrowid
        conn.close()
        
        return jsonify({'success': True, 'record_id': record_id})
        
    except Exception as e:
        logger.error(f"Save record error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard_summary')
def dashboard_data():
    """API endpoint for dashboard summary data (legacy DB-derived). Renamed to avoid collision with real-time API."""
    try:
        conn = get_db_connection()
        
        # Eligibility distribution
        cursor = conn.cursor()
        cursor.execute("SELECT emi_eligibility, COUNT(*) FROM financial_records GROUP BY emi_eligibility")
        eligibility_data = cursor.fetchall()
        
        # Salary distribution by eligibility
        cursor.execute("""
            SELECT emi_eligibility, AVG(monthly_salary) 
            FROM financial_records 
            GROUP BY emi_eligibility
        """)
        salary_data = cursor.fetchall()
        
        # Credit score distribution
        cursor.execute("""
            SELECT 
                CASE 
                    WHEN credit_score < 600 THEN 'Poor'
                    WHEN credit_score < 700 THEN 'Fair'
                    WHEN credit_score < 750 THEN 'Good'
                    ELSE 'Excellent'
                END as credit_category,
                COUNT(*)
            FROM financial_records 
            GROUP BY credit_category
        """)
        credit_data = cursor.fetchall()
        
        conn.close()
        
        result = {
            'eligibility_distribution': {row[0]: row[1] for row in eligibility_data},
            'salary_by_eligibility': {row[0]: row[1] for row in salary_data},
            'credit_distribution': {row[0]: row[1] for row in credit_data}
        }
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Dashboard data error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Real-time ML API Endpoints
@app.route('/api/predict_eligibility', methods=['POST'])
def api_predict_eligibility():
    """API endpoint for EMI eligibility prediction using ML models"""
    try:
        from real_time_manager import real_time_manager
        customer_data = request.get_json()
        
        if not customer_data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = real_time_manager.predict_emi_eligibility(customer_data)
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict_emi_amount', methods=['POST'])
def api_predict_emi_amount():
    """API endpoint for EMI amount prediction using ML models"""
    try:
        from real_time_manager import real_time_manager
        customer_data = request.get_json()
        
        if not customer_data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = real_time_manager.predict_emi_amount(customer_data)
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"EMI prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard_data', methods=['GET'])
def api_dashboard_data():
    """API endpoint for real-time dashboard data"""
    try:
        from real_time_manager import real_time_manager
        data = real_time_manager.get_real_time_dashboard_data()
        return jsonify(data)
        
    except Exception as e:
        logger.error(f"Dashboard data API error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate_sample_predictions', methods=['POST'])
def api_generate_sample_predictions():
    """API endpoint to generate sample predictions for testing"""
    try:
        from real_time_manager import real_time_manager
        data = request.get_json() or {}
        count = data.get('count', 5)
        
        predictions = real_time_manager.generate_sample_predictions(count)
        
        return jsonify({
            'success': True,
            'count': len(predictions),
            'predictions': predictions
        })
        
    except Exception as e:
        logger.error(f"Sample generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/model_status', methods=['GET'])
def api_model_status():
    """API endpoint for model status information"""
    try:
        from real_time_manager import real_time_manager
        
        status = {
            'classification_model': 'classification' in real_time_manager.models,
            'regression_model': 'regression' in real_time_manager.models,
            'scalers_loaded': len(real_time_manager.scalers) > 0,
            'encoders_loaded': len(real_time_manager.encoders) > 0,
            'total_predictions': real_time_manager.system_stats['total_predictions'],
            'success_rate': real_time_manager.system_stats['successful_predictions'] / max(real_time_manager.system_stats['total_predictions'], 1),
            'avg_response_time': real_time_manager.system_stats['avg_prediction_time']
        }
        
        return jsonify(status)
        
    except Exception as e:
        logger.error(f"Model status error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/debug/recent_predictions', methods=['GET'])
def api_debug_recent_predictions():
    """Debug endpoint: return recent predictions recorded by the real-time manager (last 20)"""
    try:
        from real_time_manager import real_time_manager
        recent = real_time_manager.real_time_data.get('recent_predictions', [])
        # Return the last 20 entries (most recent first)
        return jsonify({'count': len(recent), 'recent_predictions': recent[-20:]})
    except Exception as e:
        logger.error(f"Debug recent predictions error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/test-predict-emi')
def test_predict_emi():
    """Test prediction EMI calculations"""
    return render_template('test_predict_emi.html')

@app.route('/test-emi')
def test_emi():
    """Simple EMI test page"""
    return render_template('test_emi.html')

@app.route('/test-integration')
def test_integration():
    """Enhanced integration test page"""
    return render_template('test_integration.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('error.html', error_code=404, error_message="Page not found"), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('error.html', error_code=500, error_message="Internal server error"), 500

if __name__ == '__main__':
    # Load models on startup
    if load_models():
        logger.info("Starting EMI Risk Assessment Web Application")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        logger.error("Failed to load models. Please ensure model files exist in the 'models' directory.")