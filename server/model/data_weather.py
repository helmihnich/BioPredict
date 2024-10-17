# data_weather.py
import requests
import os
from dotenv import load_dotenv
import datetime
from data_geo import get_lat_lon  # Import the function from data_geo

# Load environment variables from the .env file
load_dotenv()

def get_weather_data(lat, lon):
    # Get the API key from environment variables
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    # OpenWeatherMap URL
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    
    # Make the request
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()

        # Extract weather information
        weather_timestamp = data['dt']
        weather_date = datetime.datetime.utcfromtimestamp(weather_timestamp).strftime('%Y-%m-%d %H:%M:%S')

        weather_data = {
            "temperature": data['main']['temp'],
            "humidity": data['main']['humidity'],
            "wind_speed": data['wind']['speed'],
            'weather_date' : weather_date
        }
        return weather_data
    else:
        return {"error": f"Failed to retrieve data: {response.status_code}"}

