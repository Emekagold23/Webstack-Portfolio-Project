import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18's new rendering API
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';  // Ensure the correct path to your CSS

// Import necessary components for routes
import Home from '.src/pages/Home';    // Home component
import Signup from '.src/pages/Signup';  // Signup component
import Login from '.src/pages/Login';    // Login component
import AdminRoutes from '.src/routes/AdminRoutes';  // Admin Routes
import UserRoutes from '.src/routes/UserRoutes';    // User Routes
import QuizRoutes from '.src/routes/QuizRoutes';    // Quiz Routes
import FeedbackRoutes from '.src/routes/FeedbackRoutes';  // Feedback Routes

// Main app component containing routing logic
const App = () => (
  <Routes>
    {/* Public Home Route */}
    <Route path="/" element={<Home />} />

    {/* Public Auth Routes */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/user/*" element={<UserRoutes />} />
    <Route path="/quiz/*" element={<QuizRoutes />} />
    <Route path="/feedback/*" element={<FeedbackRoutes />} />
  </Routes>
);

// Find the root element in index.html
const container = document.getElementById('root');
const root = createRoot(container); // React 18's createRoot

// Render the app with React Strict Mode and routing
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
