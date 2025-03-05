require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Ensure this matches your deployment configuration

// Middlewares
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Adjust to match your frontend's origin in development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Check if routes directory exists
try {
    const routes = readdirSync('./routes');
    routes.forEach((route) => {
        app.use('/api', require('./routes/' + route));
    });
} catch (error) {
    console.error('Error loading routes:', error);
    process.exit(1);
}

// Serve the frontend application for any routes not matching the API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Start server
const server = () => {
    db().then(() => {
        app.listen(PORT, () => {
            console.log('Server is running on port:', PORT);
        });
    }).catch((error) => {
        console.error('DB Connection Error:', error);
        process.exit(1); // Exit process with failure
    });
};

server();
