import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Configure the API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def generate_health_recommendations(input_text):
    """
    Generates health recommendations based on air quality data.

    Args:
        input_text (str): The air quality report and target groups for recommendations.

    Returns:
        list: A list of health recommendations generated by the model.
    """
    # Create a generative model instance
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Generate health recommendations
    response = model.generate_content(input_text)

    # Extract recommendations
    recommendations_text = response._result.candidates[0].content.parts[0].text.strip()
    
    # Split the recommendations into individual suggestions
    recommendations = recommendations_text.split("\n")  # Assuming each recommendation is on a new line

    # Clean up the recommendations list
    return [rec.strip() for rec in recommendations if rec.strip()]  # Remove empty strings

# Example usage
if __name__ == "__main__":
    # Define your input text for health recommendations
    input_text = """
    Air Quality Report for Tunis:
    - AQI: 2
    - PM10: 22.33 μg/m³, PM2.5: 10.02 μg/m³
    - NO2: 4.88 μg/m³, SO2: 5.6 μg/m³, O3: 58.65 μg/m³
    - Temperature: 24.99°C, Humidity: 78%, Wind Speed: 1.03 m/s
    - Prediction (Cardio Risk Likelihood): 5.412916119299442
    - Prediction (Admission Risk Likelihood): 2.0721101908798847

    Provide health recommendations for:
    - General Population
    - Elderly
    - Lung/Heart Disease Patients
    - Athletes
    - Pregnant Women
    - Children
    """

    # Call the function and print the recommendations
    recommendations = generate_health_recommendations(input_text)
    
    # Print each recommendation individually
    for idx, recommendation in enumerate(recommendations, start=1):
        print(f"Recommendation {idx}: {recommendation}")
