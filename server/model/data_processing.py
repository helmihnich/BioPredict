import numpy as np
from data_weather import get_weather_data
from data_air_quality import get_air_quality
from data_geo import get_lat_lon

def extract_data(city, country):
    """Extract necessary data from APIs."""
    location_info = get_lat_lon(city, country)
    if "error" in location_info:
        print(location_info['error'])
        return None

    lat = location_info['latitude']
    lon = location_info['longitude']
    
    air_quality_info = get_air_quality(lat, lon)
    weather_info = get_weather_data(lat, lon)

    # Prepare the data structure for the prediction
    aqi_data = {
        "aqi": air_quality_info.get('aqi'),
        "pm10": air_quality_info.get('pm10'),
        "pm25": air_quality_info.get('pm2_5'),
        "no2": air_quality_info.get('no2'),
        "so2": air_quality_info.get('so2', 0),  # Default value for missing SO2
        "o3": air_quality_info.get('o3'),
        "temperature": weather_info.get('temperature'),
        "humidity": weather_info.get('humidity'),
        "wind_speed": weather_info.get('wind_speed', 0)  # Default value for missing wind speed
    }
    time_info = weather_info.get('weather_date')

    return aqi_data, time_info

def prepare_input(aqi_data):
    """Prepare input data for prediction."""
    try:
        # Create a numpy array from the AQI data
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
    except KeyError as e:
        print(f"KeyError in preparing input: {e}")
        return None



def get_processed_data(city, country):
    """Main function to extract and process data for predictions."""
    aqi_data, time_info = extract_data(city, country)
    if aqi_data:
        processed_input = prepare_input(aqi_data)
        return processed_input
    else:
        return None

# Example usage
if __name__ == "__main__":
    city = "Tunis"
    country = "TN"
    processed_data = get_processed_data(city, country)
    print(processed_data)  # For debugging, you can remove this in production
