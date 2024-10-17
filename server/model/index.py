import requests
import joblib
import json
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

city, country = "Delhi", "IN"

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

def send_data_to_server(data):
    """Send data to the server at localhost:4000/weather_data."""
    try:
        response = requests.post("http://localhost:4000/weather_data", json=data)
        if response.status_code == 200:
            print("Data sent successfully.")
            print("Response from server:", response.json())
        else:
            print(f"Failed to send data. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error sending data: {e}")

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
                
                # Prepare the final data structure to send
                final_data = {
                    "aqi": aqi_data['aqi'],
                    "city": city,
                    "country": country,
                    "humidity": aqi_data['humidity'],
                    "no2": aqi_data['no2'],
                    "o3": aqi_data['o3'],
                    "pm10": aqi_data['pm10'],
                    "pm25": aqi_data['pm25'],
                    "so2": aqi_data['so2'],
                    "temperature": aqi_data['temperature'],
                    "wind": aqi_data['wind_speed'],
                    "prediction_cardio": prediction_cardio.tolist(),  # Convert to list if necessary
                    "prediction_admit": prediction_admit.tolist(),  # Convert to list if necessary
                    "time": time,
                    "recommendation_text": recommendations
                }
                
                print(final_data)
                
                for idx, recommendation in enumerate(recommendations, start=1):
                    print(f"Recommendation {idx}: {recommendation}")
                
                # Send the final data to the server
                send_data_to_server(final_data)
            else:
                print("Failed to make predictions.")
        else:
            print("Failed to extract AQI or time information.")
    else:
        print("Models could not be loaded.")

if __name__ == "__main__":
    main()
