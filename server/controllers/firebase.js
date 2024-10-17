// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');  // Load environment variables
const {getFirestore, doc, setDoc, Firestore, Timestamp} = require("firebase/firestore");


dotenv.config();  // Initialize dotenv to read from .env file

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID // Optional
};

let app;  // Firebase app instance
let db;  // Firestore instance

// Function to initialize Firebase
const initializeFirebaseApp = () => {
    if (!app) {  // Check if app is already initialized
        try {
            app = initializeApp(firebaseConfig);
            db = getFirestore();
            console.log('Firebase app initialized successfully');
        } catch (error) {
            console.error('Error initializing Firebase app:', error);
            return null;  // Return null if there's an error
        }
    } else {
        console.log('Firebase app is already initialized');
    }
    return app;  // Return the initialized app
};

// Function to get the Firebase app instance
const getFirebaseApp = () => {
    if (!app) {
        console.warn('Firebase app is not initialized. Call initializeFirebaseApp first.');
    }
    return app;  // Return the app instance (or undefined if not initialized)
};

const uploadProcessedData = async (data) => {
    console.log('Uploading data to Firestore:', data);
    const dataToUpload = {
        'aqi': data.aqi,
        'city': data.city,
        'country': data.country,
        'humidity': data.humidity,
        'no2': data.no2,
        'o3': data.o3,
        'pm10': data.pm10,
        'pm25': data.pm25,
        'so2': data.so2,
        'temperature': data.temperature,
        'wind': data.wind,
        'prediction_cardio': data.prediction_cardio,
        'prediction_admit': data.prediction_admit,
    };

    try {
        const documentRef = doc(db, "biopredict", "xJLnKLH9ROac9CK91mFZ"); // Ensure Firestore reference is correct
        await setDoc(documentRef, dataToUpload);
        console.log('Data uploaded to Firestore successfully');
    } catch (error) {
        console.error('Error uploading data:', error);
        throw error; // Rethrow error for handling in the calling function
    }
};
// Export the functions for use in other modules
module.exports = { initializeFirebaseApp, getFirebaseApp, uploadProcessedData };
