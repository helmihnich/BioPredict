// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive data from Python
app.post('/weather_data', (req, res) => {
    // Log the received data
    console.log('Received data:', req.body);
    
    // You can process the data here as needed

    // Respond back to the client
    res.status(200).json({ message: 'Data received successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
