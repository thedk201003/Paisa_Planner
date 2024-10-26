const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const MONGO_URL = process.env.MONGO_URL; // Use MONGO_URL from your .env

// Database connection function
const db = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connected Successfully');
    } catch (error) {
        console.error('DB Connection Error:', error);
        throw error;
    }
};

module.exports = { db }; // Export the db function
