import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',  // Adjust baseURL for your Django backend
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Ensure credentials (cookies) are sent with requests
});

// Set the default CSRF token handling for Django's CSRF protection
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

// Add CSRF token to request headers via interceptors
axiosInstance.interceptors.request.use(config => {
    const csrfToken = Cookies.get('csrftoken');  // Retrieve CSRF token from cookies
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;  // Set the CSRF token header
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;

