import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { signUpUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            console.log('Sending request:', { username, email, password, confirmPassword });
            const response = await signUpUser(username, email, password, confirmPassword);
            console.log('Response:', response);  
            
            // Optionally set user state after signup
            setUser(response.user); 
            
            navigate('/login'); 
        } catch (error) {
            console.error('Error during signup:', error);  
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
