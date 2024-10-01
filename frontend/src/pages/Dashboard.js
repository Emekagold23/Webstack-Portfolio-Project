import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Home.css'; // Import CSS

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link to="/dashboard/quizzes">Quizzes</Link></li>  {/* Corrected the link */}
          <li><Link to="/dashboard/settings">Settings</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome </h1>
          <p>Your personalized learning journey starts here.</p>
        </header>

        {/* Conditional rendering based on the route */}
        {location.pathname === '/dashboard' && (
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Profile</h3>
              <p>Manage your account details and preferences.</p>
              <Link to="/dashboard/profile" className="btn">Go to Profile</Link>
            </div>
            <div className="feature-card">
              <h3>Quiz</h3>
              <p>Access your quizzes and track your progress.</p>
              <Link to="/dashboard/quizzes" className="btn">View Quiz</Link>  {/* Corrected the link */}
            </div>
            <div className="feature-card">
              <h3>Settings</h3>
              <p>Update your account settings and preferences.</p>
              <Link to="/dashboard/settings" className="btn">Go to Settings</Link>
            </div>
          </div>
        )}

        {/* Render Nested Routes here */}
        <Outlet />  {/* This is where nested routes (e.g. quizzes) will be displayed */}
      </div>
    </div>
  );
};

export default Dashboard;
