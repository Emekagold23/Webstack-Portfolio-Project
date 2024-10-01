import React, { useEffect, useState } from 'react';
import { getQuizzes, getUsers, getReports } from '../services/adminService';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const quizzesData = await getQuizzes();
      const usersData = await getUsers();
      const reportsData = await getReports();
      setQuizzes(quizzesData);
      setUsers(usersData);
      setReports(reportsData);
    }
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="section">
        <h3>Manage Quizzes</h3>
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Manage Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Reports</h3>
        <ul>
          {reports.map(report => (
            <li key={report.id}>{report.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
