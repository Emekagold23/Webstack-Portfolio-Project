import React, { useEffect, useState } from 'react';
import { getAssignedQuizzes, getUserResults } from '../services/userService';

const UserDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState({ username: '', password: '' }); // State for user input
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    async function fetchData() {
      const assignedQuizzes = await getAssignedQuizzes();
      const userResults = await getUserResults();
      setQuizzes(assignedQuizzes);
      setResults(userResults);
      
      // Fetch the CSRF token
      const tokenResponse = await fetch('/api/users/get-csrf-token/');
      const tokenData = await tokenResponse.json();
      setCsrfToken(tokenData.csrfToken); // Assuming your response contains csrfToken
    }
    fetchData();
  }, []);

  const handleSignup = async () => {
    const data = {
      username: userData.username,
      password: userData.password,
    };

    try {
      const response = await fetch('/api/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include', // Important for CSRF cookies
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Signup successful:', result);
      } else {
        console.error('Signup failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-dashboard">
      <h2>Your Dashboard</h2>

      <div className="section">
        <h3>Assigned Quizzes</h3>
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Your Results</h3>
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.quizTitle} - {result.score}/{result.totalPoints}</li>
          ))}
        </ul>
      </div>

      <div className="signup">
        <h3>Sign Up</h3>
        <input 
          type="text" 
          name="username" 
          value={userData.username} 
          onChange={handleChange} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          name="password" 
          value={userData.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default UserDashboard;
