import requests
import joblib
import numpy as np

# API configuration
API_URL = "https://api.waqi.info/feed/@5142"
API_KEY = "b84c99dca21b80c0da996ffcb99d09f5f15f51f0"
QUERIES = {"token": API_KEY}

# Model paths
MODEL_PATHS = {
    "cardio": "./best_rf_model_cardio.pkl",
    "admit": "./best_rf_model_admit.pkl",
    "interaction": "./xgb_model_with_interactions.pkl"
}

# Load models
def load_models():
    models = {
        "cardio": joblib.load(MODEL_PATHS["cardio"]),
        "admit": joblib.load(MODEL_PATHS["admit"]),
        "interaction": joblib.load(MODEL_PATHS["interaction"])
    }
    return models

# Fetch AQI data from the API
def fetch_aqi_data():
    try:
        response = requests.get(API_URL, params=QUERIES)
        response.raise_for_status()  # Raises an exception for HTTP errors
        data = response.json()
        if data['status'] != 'ok':
            print("Failed to fetch data.")
            return None
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Extract necessary data from the API response
def extract_data(data):
    try:
        aqi_data = {
            "city": data['data']['city']['name'],
            "aqi": data['data']['aqi'],
            "dominant_pollutant": data['data']['dominentpol'],
            "forecast": data['data']['forecast']['daily']['pm25'],
            "pm10": data['data']['iaqi'].get('pm10', {}).get('v', 'N/A'),
            "pm25": data['data']['iaqi'].get('pm25', {}).get('v', 'N/A'),
            "no2": data['data']['iaqi'].get('no2', {}).get('v', 'N/A'),
            "so2": data['data']['iaqi'].get('so2', {}).get('v', 'N/A'),
            "o3": data['data']['iaqi'].get('o3', {}).get('v', 'N/A'),
            "temperature": data['data']['iaqi'].get('t', {}).get('v', 'N/A'),
            "humidity": data['data']['iaqi'].get('h', {}).get('v', 'N/A'),
            "wind_speed": data['data']['iaqi'].get('w', {}).get('v', 'N/A')
        }

        # Extract time information
        time_info = data['data'].get('time', {})
        iso_time = time_info.get('iso', 'N/A')
        local_time = time_info.get('s', 'N/A')

        time = {
            "iso_time": iso_time,
            "local_time": local_time
        }

        # Handle missing values with default ones
        aqi_data['so2'] = aqi_data['so2'] if aqi_data['so2'] != 'N/A' else 0
        aqi_data['wind_speed'] = aqi_data['wind_speed'] if aqi_data['wind_speed'] != 'N/A' else 0

        return aqi_data, time
    except KeyError as e:
        print(f"KeyError during data extraction: {e}")
        return None, None

# Prepare input data for prediction
def prepare_input(aqi_data):
    return np.array([[
        aqi_data['aqi'], 
        aqi_data['pm10'], 
        aqi_data['pm25'], 
        aqi_data['no2'], 
        aqi_data['so2'], 
        aqi_data['o3'], 
        aqi_data['temperature'], 
        aqi_data['humidity'], 
        aqi_data['wind_speed']
    ]])

# Make predictions using the models
def make_predictions(models, X):
    prediction_cardio = models["cardio"].predict(X)
    prediction_admit = models["admit"].predict(X)
    # Uncomment below line if interaction prediction is needed
    # prediction_interaction = models["interaction"].predict(X)
    
    return prediction_cardio, prediction_admit

# Display results
def display_results(aqi_data, prediction_cardio, prediction_admit, time):
    print(f"\n--- Air Quality Report for {aqi_data['city']} ---")
    print(f"Air Quality Index (AQI): {aqi_data['aqi']}")
    print(f"Dominant Pollutant: {aqi_data['dominant_pollutant']}")
    print(f"PM10: {aqi_data['pm10']} μg/m³, PM2.5: {aqi_data['pm25']} μg/m³")
    print(f"NO2: {aqi_data['no2']} μg/m³, SO2: {aqi_data['so2']} μg/m³, O3: {aqi_data['o3']} μg/m³")
    print(f"Temperature: {aqi_data['temperature']}°C, Humidity: {aqi_data['humidity']}%, Wind Speed: {aqi_data['wind_speed']} m/s")
    print(f"Prediction (Cardio Risk Likelihood): {prediction_cardio[0]}")
    print(f"Prediction (Admission Risk Likelihood): {prediction_admit[0]}")
    print(f"ISO Time: {time['iso_time']}")
    print(f"Local Time: {time['local_time']}")
    
    print("\n--- PM2.5 Forecast ---")
    for day in aqi_data['forecast']:
        print(f"Date: {day['day']}, Avg: {day['avg']} μg/m³, Max: {day['max']} μg/m³, Min: {day['min']} μg/m³")

# Main function to execute the steps
def main():
    models = load_models()
    data = fetch_aqi_data()

    if data:
        aqi_data, time = extract_data(data)
        if aqi_data and time:
            X = prepare_input(aqi_data)
            prediction_cardio, prediction_admit = make_predictions(models, X)
            display_results(aqi_data, prediction_cardio, prediction_admit, time)
        else:
            print("Failed to extract AQI data or time information.")
    else:
        print("Failed to fetch AQI data.")

if __name__ == "__main__":
    main()
