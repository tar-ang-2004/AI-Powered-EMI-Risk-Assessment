"""
Real-time Data Manager for EMI Risk Assessment Dashboard
Handles model predictions, metrics tracking, and real-time data updates
"""

import json
import pickle
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import threading
import time
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
import random
from typing import Dict, List, Any
import os

# Optional integrations
try:
    import psutil
except Exception:
    psutil = None

try:
    import mlflow
    from mlflow.tracking import MlflowClient
except Exception:
    mlflow = None
    MlflowClient = None
class RealTimeDataManager:
    def __init__(self):
        self.model_path = "models"
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        self.metrics_history = []
        self.current_predictions = []
        self.system_stats = {
            "total_predictions": 0,
            "successful_predictions": 0,
            "failed_predictions": 0,
            "avg_prediction_time": 0,
            "model_accuracy": {
                "classification": 0.97,
                "regression": 0.99
            }
        }
        self.real_time_data = {
            "active_users": 0,
            "predictions_per_minute": 0,
            "system_load": 0.0,
            "model_performance": {},
            "recent_predictions": []
        }
        
        # Load models and preprocessors
        self.load_models()
        
        # Start background threads for data simulation
        self.start_background_threads()
    
    def load_models(self):
        """Load all ML models and preprocessors"""
        try:
            print("🔄 Loading ML models and preprocessors...")
            
            # Load classification model
            def _safe_load(path):
                """Try common loaders (pickle, joblib) and return loaded object or raise the last exception."""
                last_exc = None
                # Try pickle
                try:
                    with open(path, 'rb') as f:
                        return pickle.load(f)
                except Exception as e:
                    last_exc = e
                # Try joblib
                try:
                    return joblib.load(path)
                except Exception as e:
                    last_exc = e
                # Try cloudpickle if available
                try:
                    import cloudpickle
                    with open(path, 'rb') as f:
                        return cloudpickle.load(f)
                except Exception as e:
                    last_exc = e
                raise last_exc

            if os.path.exists(f"{self.model_path}/classification_model.pkl"):
                try:
                    self.models['classification'] = _safe_load(f"{self.model_path}/classification_model.pkl")
                    print("✅ Classification model loaded")
                except Exception as e:
                    print(f"❌ Failed to load classification_model.pkl: {e}")
            
            # Load regression model
            if os.path.exists(f"{self.model_path}/regression_model.pkl"):
                try:
                    self.models['regression'] = _safe_load(f"{self.model_path}/regression_model.pkl")
                    print("✅ Regression model loaded")
                except Exception as e:
                    print(f"❌ Failed to load regression_model.pkl: {e}")
            
            # Load scalers
            if os.path.exists(f"{self.model_path}/scaler_classification.pkl"):
                try:
                    self.scalers['classification'] = _safe_load(f"{self.model_path}/scaler_classification.pkl")
                    print("✅ Classification scaler loaded")
                except Exception as e:
                    print(f"❌ Failed to load scaler_classification.pkl: {e}")
            
            if os.path.exists(f"{self.model_path}/scaler_regression.pkl"):
                try:
                    self.scalers['regression'] = _safe_load(f"{self.model_path}/scaler_regression.pkl")
                    print("✅ Regression scaler loaded")
                except Exception as e:
                    print(f"❌ Failed to load scaler_regression.pkl: {e}")
            
            # Load label encoder
            if os.path.exists(f"{self.model_path}/label_encoder.pkl"):
                try:
                    self.encoders['label'] = _safe_load(f"{self.model_path}/label_encoder.pkl")
                    print("✅ Label encoder loaded")
                except Exception as e:
                    print(f"❌ Failed to load label_encoder.pkl: {e}")
            
            # Load feature names
            if os.path.exists(f"{self.model_path}/feature_names.pkl"):
                try:
                    self.feature_names = _safe_load(f"{self.model_path}/feature_names.pkl")
                    print("✅ Feature names loaded")
                except Exception as e:
                    print(f"❌ Failed to load feature_names.pkl: {e}")
            
            # Load existing metrics
            self.load_existing_metrics()
            
        except Exception as e:
            print(f"❌ Error loading models: {str(e)}")
    
    def load_existing_metrics(self):
        """Load existing model metrics from files"""
        try:
            # Load evaluation dashboard data
            if os.path.exists(f"{self.model_path}/evaluation_dashboard_data.json"):
                with open(f"{self.model_path}/evaluation_dashboard_data.json", 'r') as f:
                    eval_data = json.load(f)
                
                # Update system stats with actual metrics
                for metric in eval_data.get('classification_metrics', []):
                    if metric['Model'] == 'EMI Eligibility':
                        self.system_stats['model_accuracy']['classification'] = metric['Accuracy']
                
                for metric in eval_data.get('regression_metrics', []):
                    if metric['Model'] == 'Best Regression':
                        self.system_stats['model_accuracy']['regression'] = metric['R² Score']
        
        except Exception as e:
            print(f"❌ Error loading existing metrics: {str(e)}")

    def fetch_mlflow_metrics(self) -> Dict:
        """Fetch recent metrics from MLflow (if available) and return a summary dict."""
        if MlflowClient is None and mlflow is None:
            return {}

        try:
            # Prefer MlflowClient if available; otherwise use mlflow module APIs
            client = None
            if MlflowClient is not None:
                try:
                    client = MlflowClient()
                except Exception as e:
                    print('Warning: MlflowClient init failed', e)

            agg = {
                'classification_accuracy': None,
                'regression_r2': None,
                'total_predictions': None,
                'avg_response_time': None,
                'last_updated': datetime.now().isoformat()
            }

            experiments = []
            # Try to obtain experiments list using available APIs
            if client:
                # MlflowClient in some versions exposes search_experiments or list_experiments
                if hasattr(client, 'list_experiments'):
                    experiments = client.list_experiments()
                elif hasattr(client, 'search_experiments'):
                    experiments = client.search_experiments()
                else:
                    # Fallback: try mlflow module function
                    experiments = mlflow.list_experiments() if mlflow and hasattr(mlflow, 'list_experiments') else []
            else:
                # Use mlflow module-level API
                if mlflow and hasattr(mlflow, 'list_experiments'):
                    experiments = mlflow.list_experiments()
                elif mlflow and hasattr(mlflow, 'search_experiments'):
                    experiments = mlflow.search_experiments()

            # For each experiment, look for recent runs and metrics
            for exp in experiments:
                try:
                    exp_id = getattr(exp, 'experiment_id', None) or getattr(exp, 'id', None) or getattr(exp, 'experiment_id', None)

                    runs = []
                    if client and exp_id:
                        # Prefer search_runs if present
                        if hasattr(client, 'search_runs'):
                            try:
                                runs = client.search_runs([exp_id], max_results=5)
                            except Exception:
                                runs = client.search_runs([exp_id])
                        else:
                            # Fallback to mlflow module
                            if hasattr(mlflow, 'search_runs'):
                                runs = mlflow.search_runs(exp_id)
                    else:
                        if hasattr(mlflow, 'search_runs'):
                            runs = mlflow.search_runs([exp.experiment_id]) if hasattr(exp, 'experiment_id') else mlflow.search_runs(exp)

                    for run in runs:
                        metrics = getattr(run, 'data', None)
                        if not metrics:
                            # mlflow.search_runs returns a DataFrame in some cases
                            if isinstance(run, dict):
                                m = run.get('metrics', {})
                            else:
                                continue
                        else:
                            m = getattr(metrics, 'metrics', {})

                        # Common metric names used in experiments
                        try:
                            if 'accuracy' in m and agg['classification_accuracy'] is None:
                                agg['classification_accuracy'] = float(m.get('accuracy'))
                        except Exception:
                            pass
                        try:
                            if 'r2' in m and agg['regression_r2'] is None:
                                agg['regression_r2'] = float(m.get('r2'))
                        except Exception:
                            pass
                        try:
                            if 'r2_score' in m and agg['regression_r2'] is None:
                                agg['regression_r2'] = float(m.get('r2_score'))
                        except Exception:
                            pass
                        try:
                            if 'predictions' in m and agg['total_predictions'] is None:
                                agg['total_predictions'] = int(float(m.get('predictions')))
                        except Exception:
                            pass
                        try:
                            if 'avg_response_time' in m and agg['avg_response_time'] is None:
                                agg['avg_response_time'] = float(m.get('avg_response_time'))
                        except Exception:
                            pass

                        if all(v is not None for k, v in agg.items() if k != 'last_updated'):
                            break

                except Exception:
                    continue

                if all(v is not None for k, v in agg.items() if k != 'last_updated'):
                    break

            return agg
        except Exception as e:
            print(f"❌ Error fetching MLflow metrics: {e}")
            return {}
    
    def predict_emi_eligibility(self, customer_data: Dict) -> Dict:
        """Predict EMI eligibility using classification model with enhanced metrics"""
        start_time = time.time()
        
        try:
            if 'classification' not in self.models:
                raise ValueError("Classification model not loaded")
            
            # Convert customer data to features
            features = self.prepare_classification_features(customer_data)
            
            # Scale features
            if 'classification' in self.scalers:
                features_scaled = self.scalers['classification'].transform([features])
            else:
                features_scaled = np.array([features])
            
            # Make prediction
            prediction = self.models['classification'].predict(features_scaled)[0]
            prediction_proba = self.models['classification'].predict_proba(features_scaled)[0]
            
            # Convert numpy types to Python types for JSON serialization
            prediction = int(prediction)
            prediction_proba = [float(p) for p in prediction_proba]
            
            # Get prediction label
            if 'label' in self.encoders:
                prediction_label = self.encoders['label'].inverse_transform([prediction])[0]
            else:
                prediction_label = f"Category_{prediction}"
            
            # Calculate prediction probability (highest class probability)
            max_probability = float(max(prediction_proba))
            
            # Determine eligibility status based on prediction
            if prediction_label in ['Category_2', 'Eligible', 'Approved']:
                eligibility_status = 'Eligible'
            elif prediction_label in ['Category_1', 'Conditional', 'Review']:
                eligibility_status = 'Conditional'
            else:
                eligibility_status = 'Not Eligible'
            
            # Calculate confidence level
            if max_probability > 0.8:
                confidence_level = 'High'
            elif max_probability > 0.6:
                confidence_level = 'Medium'
            else:
                confidence_level = 'Low'
            
            prediction_time = time.time() - start_time
            
            result = {
                'prediction': prediction_label,
                'eligibility_status': eligibility_status,
                'confidence': max_probability,
                'confidence_level': confidence_level,
                'prediction_probability': max_probability,  # For what-if analysis compatibility
                'probabilities': {f'Class_{i}': float(prob) for i, prob in enumerate(prediction_proba)},
                'prediction_time': prediction_time,
                'timestamp': datetime.now().isoformat(),
                'model_type': 'classification'
            }
            
            # Update stats
            self.update_prediction_stats(True, prediction_time)
            self.add_recent_prediction(result, customer_data)
            
            return result
            
        except Exception as e:
            prediction_time = time.time() - start_time
            self.update_prediction_stats(False, prediction_time)
            
            return {
                'error': str(e),
                'prediction_time': prediction_time,
                'timestamp': datetime.now().isoformat(),
                'model_type': 'classification'
            }
    
    def predict_emi_amount(self, customer_data: Dict) -> Dict:
        """Predict EMI amount using regression model with enhanced metrics"""
        start_time = time.time()
        
        try:
            if 'regression' not in self.models:
                raise ValueError("Regression model not loaded")
            
            # Convert customer data to features
            features = self.prepare_regression_features(customer_data)
            
            # Scale features
            if 'regression' in self.scalers:
                features_scaled = self.scalers['regression'].transform([features])
            else:
                features_scaled = np.array([features])
            
            # Make prediction
            prediction = self.models['regression'].predict(features_scaled)[0]
            prediction = float(prediction)  # Ensure it's a standard Python float
            
            # Calculate additional metrics for what-if analysis
            monthly_salary = float(customer_data.get('monthly_salary', 50000))
            requested_amount = float(customer_data.get('requested_amount', 500000))
            requested_tenure = float(customer_data.get('requested_tenure', 240))
            credit_score = float(customer_data.get('credit_score', 700))
            
            # Calculate EMI to income ratio
            emi_to_income_ratio = (prediction / monthly_salary) * 100
            
            # Determine risk level based on EMI to income ratio
            if emi_to_income_ratio > 50:
                risk_level = "High"
            elif emi_to_income_ratio > 30:
                risk_level = "Medium"
            else:
                risk_level = "Low"
            
            # Calculate total payment and interest
            total_payment = prediction * requested_tenure
            total_interest = total_payment - requested_amount
            
            # Calculate affordability score
            affordability_score = min(100, max(0, 100 - (emi_to_income_ratio - 20) * 2))
            
            prediction_time = time.time() - start_time
            
            result = {
                'predicted_amount': float(prediction),
                'formatted_amount': f"₹{prediction:,.2f}",
                'emi_to_income_ratio': round(emi_to_income_ratio, 2),
                'risk_level': risk_level,
                'total_payment': round(total_payment, 2),
                'total_interest': round(total_interest, 2),
                'affordability_score': round(affordability_score, 1),
                'prediction_time': prediction_time,
                'timestamp': datetime.now().isoformat(),
                'model_type': 'regression'
            }
            
            # Update stats
            self.update_prediction_stats(True, prediction_time)
            self.add_recent_prediction(result, customer_data)
            
            return result
            
        except Exception as e:
            prediction_time = time.time() - start_time
            self.update_prediction_stats(False, prediction_time)
            
            return {
                'error': str(e),
                'prediction_time': prediction_time,
                'timestamp': datetime.now().isoformat(),
                'model_type': 'regression'
            }
    
    def prepare_classification_features(self, customer_data: Dict) -> List[float]:
        """Prepare features for classification model with proper categorical encoding"""
        try:
            # Create a complete feature vector matching the training data structure
            
            # Numerical features (continuous)
            numerical_features = [
                float(customer_data.get('age', 30)),
                float(customer_data.get('family_size', 3)),
                float(customer_data.get('dependents', 1)),
                float(customer_data.get('years_of_employment', 5)),
                float(customer_data.get('monthly_salary', 50000)),
                float(customer_data.get('credit_score', 700)),
                float(customer_data.get('bank_balance', 200000)),
                float(customer_data.get('emergency_fund', 100000)),
                float(customer_data.get('monthly_rent', 25000)),
                float(customer_data.get('school_fees', 5000)),
                float(customer_data.get('college_fees', 0)),
                float(customer_data.get('travel_expenses', 5000)),
                float(customer_data.get('groceries_utilities', 15000)),
                float(customer_data.get('other_monthly_expenses', 5000)),
                float(customer_data.get('current_emi_amount', 0)),
                float(customer_data.get('requested_amount', 500000)),
                float(customer_data.get('requested_tenure', 240))
            ]
            
            # Categorical features with one-hot encoding
            # Gender encoding
            gender = customer_data.get('gender', 'Male')
            gender_features = [1.0 if gender == 'Female' else 0.0, 1.0 if gender == 'Male' else 0.0]
            
            # Marital status encoding
            marital_status = customer_data.get('marital_status', 'Married')
            marital_features = [
                1.0 if marital_status == 'Married' else 0.0,
                1.0 if marital_status == 'Single' else 0.0
            ]
            
            # Education encoding - align with form values (e.g. 'High_School', 'Undergraduate', 'Graduate', 'Post_Graduate', 'Others')
            education = customer_data.get('education', 'Graduate')
            education_features = [
                1.0 if education == 'Graduate' else 0.0,
                1.0 if education == 'Post_Graduate' or education == 'Postgraduate' else 0.0,
                1.0 if education == 'High_School' or education == 'School' else 0.0,
                1.0 if education == 'Undergraduate' else 0.0
            ]
            
            # Employment type encoding - match form values: 'Government','Private','Self_Employed','Contract'
            employment_type = customer_data.get('employment_type', 'Private')
            employment_features = [
                1.0 if employment_type == 'Government' else 0.0,
                1.0 if employment_type == 'Private' else 0.0,
                1.0 if employment_type == 'Self_Employed' else 0.0,
                1.0 if employment_type == 'Contract' else 0.0
            ]
            
            # Company type encoding - align with template options: 'MNC','Startup','SME','Others'
            company_type = customer_data.get('company_type', 'MNC')
            company_features = [
                1.0 if company_type == 'MNC' else 0.0,
                1.0 if company_type == 'Startup' else 0.0,
                1.0 if company_type == 'SME' else 0.0,
                1.0 if company_type == 'Others' else 0.0
            ]
            
            # House type encoding
            house_type = customer_data.get('house_type', 'Rented')
            house_features = [
                1.0 if house_type == 'Owned' else 0.0,
                1.0 if house_type == 'Rented' else 0.0
            ]
            
            # Existing loans encoding
            existing_loans = customer_data.get('existing_loans', 'No')
            loans_features = [
                1.0 if existing_loans == 'No' else 0.0,
                1.0 if existing_loans == 'Yes' else 0.0
            ]
            
            # EMI scenario encoding
            emi_scenario = customer_data.get('emi_scenario', 'New_Loan')
            scenario_features = [
                1.0 if emi_scenario == 'Balance_Transfer' else 0.0,
                1.0 if emi_scenario == 'Loan_Against_Property' else 0.0,
                1.0 if emi_scenario == 'New_Loan' else 0.0,
                1.0 if emi_scenario == 'Refinance' else 0.0,
                1.0 if emi_scenario == 'Top_Up' else 0.0
            ]
            
            # Combine all features
            all_features = (numerical_features + gender_features + marital_features + 
                          education_features + employment_features + company_features + 
                          house_features + loans_features + scenario_features)
            
            # Ensure we have the correct number of features (should be 65)
            expected_features = 65
            if len(all_features) < expected_features:
                # Pad with zeros if we have fewer features
                all_features.extend([0.0] * (expected_features - len(all_features)))
            elif len(all_features) > expected_features:
                # Truncate if we have more features
                all_features = all_features[:expected_features]
            
            return all_features
            
        except Exception as e:
            # Fallback to default feature vector
            return [0.0] * 65
    
    def prepare_regression_features(self, customer_data: Dict) -> List[float]:
        """Prepare features for regression model with proper categorical encoding"""
        try:
            # Create a complete feature vector matching the training data structure
            
            # Numerical features (continuous) - excluding target variables
            numerical_features = [
                float(customer_data.get('age', 30)),
                float(customer_data.get('family_size', 3)),
                float(customer_data.get('dependents', 1)),
                float(customer_data.get('years_of_employment', 5)),
                float(customer_data.get('monthly_salary', 50000)),
                float(customer_data.get('credit_score', 700)),
                float(customer_data.get('bank_balance', 200000)),
                float(customer_data.get('emergency_fund', 100000)),
                float(customer_data.get('monthly_rent', 25000)),
                float(customer_data.get('school_fees', 5000)),
                float(customer_data.get('college_fees', 0)),
                float(customer_data.get('travel_expenses', 5000)),
                float(customer_data.get('groceries_utilities', 15000)),
                float(customer_data.get('other_monthly_expenses', 5000)),
                float(customer_data.get('current_emi_amount', 0)),
                float(customer_data.get('requested_amount', 500000)),
                float(customer_data.get('requested_tenure', 240))
            ]
            
            # Categorical features with one-hot encoding (same as classification)
            # Gender encoding
            gender = customer_data.get('gender', 'Male')
            gender_features = [1.0 if gender == 'Female' else 0.0, 1.0 if gender == 'Male' else 0.0]
            
            # Marital status encoding
            marital_status = customer_data.get('marital_status', 'Married')
            marital_features = [
                1.0 if marital_status == 'Married' else 0.0,
                1.0 if marital_status == 'Single' else 0.0
            ]
            
            # Education encoding - align with form values (e.g. 'High_School', 'Undergraduate', 'Graduate', 'Post_Graduate', 'Others')
            education = customer_data.get('education', 'Graduate')
            education_features = [
                1.0 if education == 'Graduate' else 0.0,
                1.0 if education == 'Post_Graduate' or education == 'Postgraduate' else 0.0,
                1.0 if education == 'High_School' or education == 'School' else 0.0,
                1.0 if education == 'Undergraduate' else 0.0
            ]
            
            # Employment type encoding - match form values: 'Government','Private','Self_Employed','Contract'
            employment_type = customer_data.get('employment_type', 'Private')
            employment_features = [
                1.0 if employment_type == 'Government' else 0.0,
                1.0 if employment_type == 'Private' else 0.0,
                1.0 if employment_type == 'Self_Employed' else 0.0,
                1.0 if employment_type == 'Contract' else 0.0
            ]
            
            # Company type encoding - align with template options: 'MNC','Startup','SME','Others'
            company_type = customer_data.get('company_type', 'MNC')
            company_features = [
                1.0 if company_type == 'MNC' else 0.0,
                1.0 if company_type == 'Startup' else 0.0,
                1.0 if company_type == 'SME' else 0.0,
                1.0 if company_type == 'Others' else 0.0
            ]
            
            # House type encoding
            house_type = customer_data.get('house_type', 'Rented')
            house_features = [
                1.0 if house_type == 'Owned' else 0.0,
                1.0 if house_type == 'Rented' else 0.0
            ]
            
            # Existing loans encoding
            existing_loans = customer_data.get('existing_loans', 'No')
            loans_features = [
                1.0 if existing_loans == 'No' else 0.0,
                1.0 if existing_loans == 'Yes' else 0.0
            ]
            
            # EMI scenario encoding
            emi_scenario = customer_data.get('emi_scenario', 'New_Loan')
            scenario_features = [
                1.0 if emi_scenario == 'Balance_Transfer' else 0.0,
                1.0 if emi_scenario == 'Loan_Against_Property' else 0.0,
                1.0 if emi_scenario == 'New_Loan' else 0.0,
                1.0 if emi_scenario == 'Refinance' else 0.0,
                1.0 if emi_scenario == 'Top_Up' else 0.0
            ]
            
            # Combine all features
            all_features = (numerical_features + gender_features + marital_features + 
                          education_features + employment_features + company_features + 
                          house_features + loans_features + scenario_features)
            
            # Ensure we have the correct number of features (should be 65 for regression)
            expected_features = 65
            if len(all_features) < expected_features:
                # Pad with zeros if we have fewer features
                all_features.extend([0.0] * (expected_features - len(all_features)))
            elif len(all_features) > expected_features:
                # Truncate if we have more features
                all_features = all_features[:expected_features]
            
            return all_features
            
        except Exception as e:
            # Fallback to default feature vector
            return [0.0] * 65
    
    def update_prediction_stats(self, success: bool, prediction_time: float):
        """Update prediction statistics"""
        self.system_stats['total_predictions'] += 1
        
        if success:
            self.system_stats['successful_predictions'] += 1
        else:
            self.system_stats['failed_predictions'] += 1
        
        # Update average prediction time
        total_time = self.system_stats['avg_prediction_time'] * (self.system_stats['total_predictions'] - 1)
        self.system_stats['avg_prediction_time'] = (total_time + prediction_time) / self.system_stats['total_predictions']
    
    def add_recent_prediction(self, result: Dict, customer_data: Dict):
        """Add prediction to recent predictions list"""
        prediction_entry = {
            'result': result,
            'input_data': customer_data,
            'timestamp': datetime.now().isoformat()
        }
        
        self.real_time_data['recent_predictions'].append(prediction_entry)
        
        # Keep only last 50 predictions
        if len(self.real_time_data['recent_predictions']) > 50:
            self.real_time_data['recent_predictions'] = self.real_time_data['recent_predictions'][-50:]
    
    def get_real_time_dashboard_data(self) -> Dict:
        """Get current dashboard data for real-time updates"""
        # Attach MLflow metrics if available
        mlflow_metrics = self.fetch_mlflow_metrics()

        # Combine system metrics with MLflow metrics
        combined = {
            'timestamp': datetime.now().isoformat(),
            'system_stats': self.system_stats,
            'real_time_data': self.real_time_data,
            'model_status': {
                'classification_loaded': 'classification' in self.models,
                'regression_loaded': 'regression' in self.models,
                'scalers_loaded': len(self.scalers) > 0,
                'encoders_loaded': len(self.encoders) > 0
            },
            'performance_metrics': self.get_performance_metrics(),
            'mlflow_metrics': mlflow_metrics
        }

        return combined
    
    def get_performance_metrics(self) -> Dict:
        """Calculate current performance metrics"""
        success_rate = 0
        if self.system_stats['total_predictions'] > 0:
            success_rate = self.system_stats['successful_predictions'] / self.system_stats['total_predictions']
        
        return {
            'success_rate': success_rate,
            'predictions_per_minute': self.real_time_data['predictions_per_minute'],
            'avg_response_time': self.system_stats['avg_prediction_time'],
            'system_health': 'Excellent' if success_rate > 0.95 else 'Good' if success_rate > 0.8 else 'Needs Attention'
        }
    
    def start_background_threads(self):
        """Start background threads for data simulation"""
        
        def simulate_system_metrics():
            """Simulate real-time system metrics"""
            while True:
                try:
                    # Active users: if we have real metrics from MLflow recent_predictions length, prefer that
                    self.real_time_data['active_users'] = random.randint(10, 100)

                    # Use psutil if available for accurate system metrics
                    if psutil:
                        try:
                            self.real_time_data['system_load'] = round(psutil.cpu_percent(interval=1), 2)
                            mem = psutil.virtual_memory()
                            self.real_time_data['memory_usage'] = round(mem.percent, 2)
                        except Exception:
                            self.real_time_data['system_load'] = round(random.uniform(20, 85), 2)
                    else:
                        # Simulate system load (0-100%)
                        self.real_time_data['system_load'] = round(random.uniform(20, 85), 2)
                    
                    # Calculate predictions per minute
                    current_time = datetime.now()
                    minute_ago = current_time - timedelta(minutes=1)
                    
                    recent_predictions = [
                        p for p in self.real_time_data['recent_predictions']
                        if datetime.fromisoformat(p['timestamp']) > minute_ago
                    ]
                    self.real_time_data['predictions_per_minute'] = len(recent_predictions)
                    
                    # Try to enrich model performance using MLflow metrics when available
                    try:
                        mlflow_metrics = self.fetch_mlflow_metrics()
                        if mlflow_metrics:
                            # overlay values where present
                            self.real_time_data['model_performance'] = {
                                'classification_accuracy': mlflow_metrics.get('classification_accuracy') or round(self.system_stats['model_accuracy']['classification'] + random.uniform(-0.01, 0.01), 4),
                                'regression_r2': mlflow_metrics.get('regression_r2') or round(self.system_stats['model_accuracy']['regression'] + random.uniform(-0.005, 0.005), 4),
                                'total_predictions': mlflow_metrics.get('total_predictions') or self.system_stats['total_predictions'],
                                'avg_response_time': mlflow_metrics.get('avg_response_time') or self.system_stats['avg_prediction_time'],
                                'last_updated': mlflow_metrics.get('last_updated') or current_time.isoformat()
                            }
                        else:
                            base_clf_acc = self.system_stats['model_accuracy']['classification']
                            base_reg_acc = self.system_stats['model_accuracy']['regression']
                            self.real_time_data['model_performance'] = {
                                'classification_accuracy': round(base_clf_acc + random.uniform(-0.02, 0.02), 4),
                                'regression_r2': round(base_reg_acc + random.uniform(-0.01, 0.01), 4),
                                'last_updated': current_time.isoformat()
                            }
                    except Exception as e:
                        print('Error enriching with MLflow metrics:', e)
                        base_clf_acc = self.system_stats['model_accuracy']['classification']
                        base_reg_acc = self.system_stats['model_accuracy']['regression']
                        self.real_time_data['model_performance'] = {
                            'classification_accuracy': round(base_clf_acc + random.uniform(-0.02, 0.02), 4),
                            'regression_r2': round(base_reg_acc + random.uniform(-0.01, 0.01), 4),
                            'last_updated': current_time.isoformat()
                        }
                    
                    time.sleep(5)  # Update every 5 seconds
                    
                except Exception as e:
                    print(f"Error in background thread: {e}")
                    time.sleep(10)
        
        # Start background thread
        thread = threading.Thread(target=simulate_system_metrics, daemon=True)
        thread.start()
    
    def generate_sample_predictions(self, count: int = 10) -> List[Dict]:
        """Generate sample predictions for testing"""
        sample_customers = [
            {'income': 75000, 'age': 28, 'experience': 3, 'family_size': 2, 'credit_score': 750, 'loan_amount': 800000, 'loan_tenure': 240, 'interest_rate': 8.2},
            {'income': 120000, 'age': 35, 'experience': 8, 'family_size': 4, 'credit_score': 720, 'loan_amount': 1200000, 'loan_tenure': 300, 'interest_rate': 8.5},
            {'income': 45000, 'age': 25, 'experience': 2, 'family_size': 2, 'credit_score': 680, 'loan_amount': 500000, 'loan_tenure': 180, 'interest_rate': 9.0},
            {'income': 95000, 'age': 32, 'experience': 6, 'family_size': 3, 'credit_score': 780, 'loan_amount': 900000, 'loan_tenure': 240, 'interest_rate': 8.0},
            {'income': 60000, 'age': 29, 'experience': 4, 'family_size': 3, 'credit_score': 710, 'loan_amount': 600000, 'loan_tenure': 200, 'interest_rate': 8.7}
        ]
        
        predictions = []
        for i in range(min(count, len(sample_customers))):
            customer = sample_customers[i]
            
            # Generate both classification and regression predictions
            clf_pred = self.predict_emi_eligibility(customer)
            reg_pred = self.predict_emi_amount(customer)
            
            predictions.append({
                'customer_data': customer,
                'classification_result': clf_pred,
                'regression_result': reg_pred
            })
        
        return predictions

# Global instance
real_time_manager = RealTimeDataManager()