import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/auth';

/**
 * Protected Route Component
 * Prevents access to routes without authentication
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = storage.getToken();
    const user = storage.getUser();
    
    console.log('🔐 ProtectedRoute: Checking authentication...');
    console.log('   Token:', token ? '✅ Present' : '❌ Missing');
    console.log('   User:', user ? `✅ ${user.email} (${user.role})` : '❌ Missing');
    console.log('   Current path:', location.pathname);
    
    if (token && user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      console.log('✅ Authenticated as:', user.role);
      
      // Check if user has permission for this route
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.log('❌ User role not allowed for this route');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
      console.log('❌ Not authenticated - will redirect to login');
    }
    
    setIsChecking(false);
  }, [location.pathname, allowedRoles]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('🔒 Access denied - redirecting to login');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname, message: 'Please login to access this page' }}
        replace 
      />
    );
  }

  // Render protected content
  return children;
}















