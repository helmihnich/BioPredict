# BioPredict

BioPredict is a web application designed to predict the health impacts of climate change on vulnerable populations, such as elderly individuals, pregnant women, children, and those with lung problems. Using real-time climatic data, BioPredict provides personalized health recommendations based on air quality and weather conditions for specific locations.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Collects weather and air quality data using OpenWeatherMap APIs.
- Predicts potential health risks for vulnerable groups based on environmental data.
- Provides recommendations tailored to user-specific conditions (e.g., elderly, pregnant women, lung disease patients).
- User-friendly interface built with Chakra UI for seamless interaction.
- Backend prediction model trained with Kaggle datasets on air quality, weather, and health impacts.

## Architecture

The application is divided into two main parts:
1. **Client**: Frontend built with Next.js, using Chakra UI for design and UI components.
2. **Server**: Backend composed of two parts:
   - **Node.js Server**: Handles API requests from the client, interacts with the Python prediction model, and stores data in Firebase.
   - **Python Model**: Machine learning model trained on climatic and health data to predict health impacts. The model processes data sent from the Node.js server and returns predictions.

### Architecture Flow

1. **Frontend (Next.js)**:
   - User searches for a city on the frontend.
   - Request is sent to the Node.js server at the `/city_data` endpoint.

2. **Backend (Node.js & Python)**:
   - **Node.js**:
     - Receives the request from the client.
     - Sends the city data to the Python prediction model through the endpoint `/weather_data`.
     - Receives the processed data (predictions) from the Python model.
     - Stores data in Firebase and forwards predictions to the frontend.
   - **Python**:
     - Retrieves real-time data from three OpenWeatherMap APIs:
       - Geolocation API for city coordinates.
       - Air Quality API for current air quality data.
       - Weather API for temperature, humidity, and other weather-related data.
     - Uses the pre-trained model to predict health impacts and sends predictions back to the Node.js server.

3. **Frontend (Next.js)**:
   - Displays the health impact predictions and recommendations based on the returned data.

### Architecture Diagram

```plaintext
Frontend (Next.js) ---> Backend (Node.js) ---> Python Model ---> OpenWeatherMap APIs
      ^                                      |                    |
      |                                      V                    V
  User Request  <-----------------------> Firebase Database    Health Predictions

```
## Technologies Used

### Frontend

Next.js: React-based framework for server-side rendering.
Chakra UI: Component library for UI design.

### Backend
*Node.js*: Server handling client requests, API calls, and database interactions.
*Python*: Prediction model built with machine learning.
*Firebase*: NoSQL database to store data.
*Postgree*: NoSQL database to store data.

### APIs

*OpenWeatherMap*:

*Geolocation API*: Retrieve geographic coordinates of the city.
*Air Quality API*: Get air quality data for a given city.
*Weather API*: Get current weather conditions.

### Data Source

*Kaggle Datasets*: Air quality, weather, and health impact data used to train the machine learning model.
link: 'https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.kaggle.com%2Fdatasets%2Frabieelkharoua%2Fair-quality-and-health-impact-dataset%3Fresource%3Ddownload&h=AT0Hg1CI1QDShL9X-WdybnF_fOMo45tusdooM_Pa8FHJefhxGeOxM55wd8WxITUD5-bWM8_BFDXVtBtSm0uji-h3-tA-UvBY8qdhUPCqsyIu6NLMQJi43y7LvKKptA'

# Installation

## Prerequisites

Node.js installed.
Python installed.
Firebase account and project setup.
Steps

Clone the repository:
`
git clone https://github.com/your-username/biopredict.git
cd biopredict
Install client dependencies:
`



`cd client
npm install
`
## Install server dependencies:

`cd ../server
npm install`

## Set up the Python environment for the prediction model:

`pip install -r requirements.txt`

Create a .env file in the server folder to store API keys and Firebase credentials.

# Start the application:

## Client (Next.js frontend):

`
cd client
npm run dev
`

## Server (Node.js backend):

`cd server
npm start`

## Python Model:

`
cd biopredict/server/model
python index.py
`

### Usage

Open your browser and write `localhost:3000/home`

Search for a city to view health impact predictions and recommendations.

## API Endpoints

### Frontend to Backend

Post /city_data: Sends city search request to the Node.js server.
Post Backend to Python
POST /weather_data: Node.js server sends weather data to Python for prediction.

### External APIs

OpenWeatherMap APIs: Used for retrieving weather, air quality, and geolocation data.
Contributing
Contributions are welcome! Please fork the repository and create a pull request.

License
This project is licensed under the MIT License.




