import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';  // Import your main app component
import { AuthProvider } from './contexts/AuthContext';  // Import AuthProvider
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component

// Get the root element from index.html
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>  {/* Wrap your app with AuthProvider to provide authentication context */}
        <Header /> {/* Include Header here */}
        <App /> {/* Your main app routes */}
        <Footer /> {/* Include Footer here */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
