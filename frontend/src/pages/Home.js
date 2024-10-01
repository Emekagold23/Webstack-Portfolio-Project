import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Quizly</h1>
          <p>Interactive Learning Made Fun</p>
          <Link to="/signup" className="btn hero-signup-btn">Get Started</Link>
        </div>
      </section>

      {/* Login Container */}
      <div className="login-container">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
      </div>

      {/* Features Section */}
      <section className="feature-section">
        <h2>Explore Our Features</h2>
        <div className="feature-grid">
          {[
            { title: 'Multiple Categories', description: 'Test your knowledge across various domains.', color: '#4CAF50' },
            { title: 'Real-time Feedback', description: 'Receive instant feedback on your answers.', color: '#2196F3' },
            { title: 'Progress Tracking', description: 'Track your quiz scores over time.', color: '#FF9800' }
          ].map((feature, index) => (
            <div key={index} className="feature-card" style={{ backgroundColor: feature.color }}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
