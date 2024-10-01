import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);  // Go back to previous page
  const goHome = () => navigate('/');  // Navigate to home page

  return (
    <header style={styles.header}>
      <div style={styles.navButtons}>
        <button onClick={goHome} style={styles.button}>
          Home
        </button>
        <button onClick={goBack} style={styles.button}>
          Back
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    borderBottom: '2px solid #ddd',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Header;
