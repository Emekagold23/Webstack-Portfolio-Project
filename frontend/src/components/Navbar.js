import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, userRole, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token on logout
    setIsAuthenticated(false);         // Update authentication state
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          {userRole === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
          {userRole === 'regular_user' && <Link to="/user-dashboard">User Dashboard</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
