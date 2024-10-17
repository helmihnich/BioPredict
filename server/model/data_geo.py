# data_geo.py
import requests
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

def get_lat_lon(city, country):
    # Get the API key from environment variables
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    # Geocoding API URL
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{country}&limit=1&appid={api_key}"
    
    # Make the request
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        if data:
            # Extract latitude and longitude
            lat_lon_data = {
                "latitude": data[0]['lat'],
                "longitude": data[0]['lon']
            }
            return lat_lon_data
        else:
            return {"error": "City not found"}
    else:
        return {"error": f"Failed to retrieve data: {response.status_code}"}
