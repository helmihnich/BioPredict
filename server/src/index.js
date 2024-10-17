// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { initializeFirebaseApp, uploadProcessedData } = require('../controllers/firebase'); // Adjusted path

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize Firebase app
initializeFirebaseApp(); // Ensure Firebase is initialized

// Function to validate incoming data
function validateWeatherData(data) {
    // Simple validation rules
    const requiredFields = [
        'aqi', 'city', 'country', 'humidity', 'no2', 
        'o3', 'pm10', 'pm25', 'so2', 'temperature', 
        'wind', 'prediction_cardio', 'prediction_admit', 'time', 'recommendation_text'
    ];
    return requiredFields.every(field => data.hasOwnProperty(field));
}

// Endpoint to receive data from Python
app.post('/weather_data', async (req, res) => {
    // Log the received data
    console.log('Received data:', req.body);
    
    // Validate the incoming data
    if (!validateWeatherData(req.body)) {
        return res.status(400).json({ message: 'Invalid data format!' });
    }

    // Prepare the data for storage
    const weatherData = {
        aqi: req.body.aqi,
        city: req.body.city,
        country: req.body.country,
        humidity: req.body.humidity,
        no2: req.body.no2,
        o3: req.body.o3,
        pm10: req.body.pm10,
        pm25: req.body.pm25,
        so2: req.body.so2,
        temperature: req.body.temperature,
        wind: req.body.wind,
        prediction_cardio: req.body.prediction_cardio[0],
        prediction_admit: req.body.prediction_admit[0],
    };

    try {
        // Upload the processed data to Firestore
        await uploadProcessedData(weatherData);
        res.status(200).json({ message: 'Data received and uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading data to Firestore:', error);
        res.status(500).json({ message: 'Failed to upload data.' });
    }
});

app.post("/search", (req, res) => {
    const { city, country } = req.body; // Extract city and country from the request body
  
    if (!city || !country) {
      return res.status(400).json({ error: "City and country are required" });
    }
  
    // Handle the received data (you can process it, query a database, etc.)
    console.log(`Received City: ${city}, Country: ${country}`);
  
    // Send a response back to the client
    res.status(200).json({
      message: "Data received successfully",
      city: city,
      country: country,
    });
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
