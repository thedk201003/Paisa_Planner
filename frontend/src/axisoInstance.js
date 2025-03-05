// src/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    // baseURL: 'https://paisaplanner-1.onrender.com/api/', // Ensure this URL is correct
    baseURL: 'http://localhost:5000/api/'
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token has expired or is invalid
            localStorage.removeItem('token'); // Clear the token from local storage
            window.location.href = '/login'; // Redirect to the login page
            toast.error('Session expired. Please log in again.');
        } else {
            // Handle other errors
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
