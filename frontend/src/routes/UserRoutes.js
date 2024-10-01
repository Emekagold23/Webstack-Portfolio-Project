import React from 'react';
import { Route } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const UserRoutes = () => {
  return (
    <Route
      path="/user-dashboard"
      element={
        <ProtectedRoute roleRequired="regular_user">
          <UserDashboard />
        </ProtectedRoute>
      }
    />
  );
};

export default UserRoutes;
