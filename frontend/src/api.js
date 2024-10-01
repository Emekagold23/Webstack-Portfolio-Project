import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Set up Axios interceptor to add the JWT token to each request
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Sign up a new user
export const signUpUser = async (username, email, password, confirmPassword) => {
    try {
        const response = await api.post('/signup/', {
            username,
            email,
            password,
            confirm_password: confirmPassword 
        });
        return response.data; 
    } catch (error) {
        throw new Error('Signup failed: ' + error.response?.data?.detail || error.message);
    }
};

// Log in a user and retrieve tokens
export const loginUser = async (username, password) => {
    const response = await api.post('/login/', { username, password });
    // Store the tokens in localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data; 
};

// Log out the user
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    // Update the access token in localStorage
    localStorage.setItem('accessToken', response.data.access);
    return response.data; 
};

// Fetch quizzes from the API
export const fetchQuizzes = async () => {
    return await api.get('/quizzes/'); // Adjust endpoint as needed
};

// Fetch a specific quiz by ID
export const fetchQuizById = async (id) => {
    return await api.get(`/quizzes/${id}/`); 
};

// Fetch user profile
export const fetchUserProfile = async () => {
    return await api.get('/users/profile/'); 
};

// Fetch categories for quizzes
export const fetchCategories = async () => {
    return await api.get('/categories/'); 
};

// Fetch user dashboard data
export const fetchUserDashboard = async () => {
    return await api.get('/dashboard/'); 
};
