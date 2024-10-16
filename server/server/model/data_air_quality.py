# data_air_quality.py
import requests
import os
from dotenv import load_dotenv
from data_geo import get_lat_lon  # Import the function from data_geo

# Load environment variables from the .env file
load_dotenv()

def get_air_quality(lat, lon):
    # Get the API key from environment variables
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    # OpenWeatherMap Air Pollution API URL
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
    
    # Make the request
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        
        # Extract air quality information
        air_quality_data = {
            "aqi": data['list'][0]['main']['aqi'],  # Air Quality Index (AQI)
            "pm2_5": data['list'][0]['components']['pm2_5'],  # Fine particles (PM2.5)
            "pm10": data['list'][0]['components']['pm10'],  # Particulate matter (PM10)
            "o3": data['list'][0]['components']['o3'],  # Ozone (O3)
            "no2": data['list'][0]['components']['no2'],  # Nitrogen dioxide (NO2)
            "so2": data['list'][0]['components']['so2'],  # Sulfur dioxide (SO2)
            "co": data['list'][0]['components']['co']  # Carbon monoxide (CO)
        }
        return air_quality_data
    else:
        return {"error": f"Failed to retrieve data: {response.status_code}"}


