import axios from 'axios';

// Set the base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch the CSRF token from a meta tag (ensure this is in your HTML)
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// Add a request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Function to login a user
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    localStorage.setItem('token', response.data.token); // Save the token in localStorage
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to register a new user
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to get the current user's profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/auth/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
};

// Function to get assigned quizzes for the user
export const getAssignedQuizzes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/quizzes/assigned/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned quizzes:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to get quiz results for the user
export const getUserResults = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/quizzes/results/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user results:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
