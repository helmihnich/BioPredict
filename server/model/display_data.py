        
def display_results(aqi_data, prediction_cardio, prediction_admit, time, city):
    """
    Generate a formatted air quality report.

    Args:
        aqi_data (dict): Dictionary containing air quality data.
        prediction_cardio (list): Prediction data for cardio risk.
        prediction_admit (list): Prediction data for admission risk.
        time (str): Local time of the report.
        city (str): Name of the city.

    Returns:
        str: Formatted air quality report as a string.
    """



    report = (
        f"\n--- Air Quality Report for {city} ---\n"
        f"Air Quality Index (AQI): {aqi_data['aqi']}\n"
        f"PM10: {aqi_data['pm10']} μg/m³, PM2.5: {aqi_data['pm25']} μg/m³\n"
        f"NO2: {aqi_data['no2']} μg/m³, SO2: {aqi_data['so2']} μg/m³, O3: {aqi_data['o3']} μg/m³\n"
        f"Temperature: {aqi_data['temperature']}°C, Humidity: {aqi_data['humidity']}%, Wind Speed: {aqi_data['wind_speed']} m/s\n"
        f"Prediction (Cardio Risk Likelihood): {prediction_cardio[0]}\n"
        f"Prediction (Admission Risk Likelihood): {prediction_admit[0]}\n"
        f"Local Time: {time}\n"
    )
    return report