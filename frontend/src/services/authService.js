import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/';

// Signup function
const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}signup/`, userData);
        if (response.data.token) {
            // Store the token and user details after signup
            localStorage.setItem('token', response.data.token); 
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

// Login function
const login = async (username, password) => {
    console.log('Attempting to login with:', username, password); // Log input data
    try {
        const response = await axios.post(`${API_URL}login/`, { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        console.log('Login successful:', response.data); // Log success
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message); // Log errors
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Logout function
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export default {
    signup,
    login,
    logout,
};
