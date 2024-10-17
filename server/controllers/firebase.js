// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');  // Load environment variables
const {getFirestore, doc, setDoc} = require("firebase/firestore");

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

const uploadProcessedData = async () => {
    const dataToUpload = {
        
    }
}

// Export the functions for use in other modules
module.exports = { initializeFirebaseApp, getFirebaseApp };
