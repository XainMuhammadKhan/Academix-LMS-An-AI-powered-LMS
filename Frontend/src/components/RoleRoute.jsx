import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// RoleRoute: Wraps children and ensures user is authenticated and has one of the allowed roles
const RoleRoute = ({ allowedRoles = [], children }) => {
  const { userData } = useSelector((s) => s.user);
  if (!userData) return <Navigate to='/' replace />;
  const role = userData?.role;
  if (!allowedRoles.includes(role)) return <Navigate to='/home' replace />;
  return children;
}

export default RoleRoute
