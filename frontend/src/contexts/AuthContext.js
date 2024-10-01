import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const data = await authService.login(username, password);
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    // Call the logout function in the authService if necessary (e.g., server-side logout)
    authService.logout();
    // Clear user and token from state and localStorage
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Redirect to home page
    navigate('/');
  };

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
