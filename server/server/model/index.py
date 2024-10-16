import requests
import joblib
import numpy as np
from dotenv import load_dotenv
from data_weather import get_weather_data
from data_air_quality import get_air_quality
from data_geo import get_lat_lon
from health_recommendation import generate_health_recommendations 
from display_data import display_results
from data_processing import extract_data, prepare_input

# Model paths
MODEL_PATHS = {
    "cardio": "./best_rf_model_cardio.pkl",
    "admit": "./best_rf_model_admit.pkl",
    "interaction": "./xgb_model_with_interactions.pkl"
}

city, country = "Tunis", "TN"

def load_models():
    """Load machine learning models from specified paths."""
    try:
        models = {name: joblib.load(path) for name, path in MODEL_PATHS.items()}
        return models
    except Exception as e:
        print(f"Error loading models: {e}")
        return None


def make_predictions(models, X):
    """Make predictions using the loaded models."""
    try:
        prediction_cardio = models["cardio"].predict(X)
        prediction_admit = models["admit"].predict(X)
        return prediction_cardio, prediction_admit
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None, None

def main():
    """Main function to execute the prediction workflow."""
    
    
    models = load_models()
    if models:
        aqi_data, time = extract_data(city, country)
        if aqi_data and time:
            X = prepare_input(aqi_data)
            prediction_cardio, prediction_admit = make_predictions(models, X)
            if prediction_cardio is not None and prediction_admit is not None:
                result = display_results(aqi_data, prediction_cardio, prediction_admit, time, city)
                recommendation_text = (
                    result + 
                    "Provide health recommendations for - General Population - Elderly - "
                    "Lung/Heart Disease Patients - Athletes - Pregnant Women - Children"
                )
                recommendations = generate_health_recommendations(recommendation_text)
                print(result)
                for idx, recommendation in enumerate(recommendations, start=1):
                    print(f"Recommendation {idx}: {recommendation}")
            else:
                print("Failed to make predictions.")
        else:
            print("Failed to extract AQI or time information.")
    else:
        print("Models could not be loaded.")

if __name__ == "__main__":
    main()
