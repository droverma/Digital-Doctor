import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedRoute = ({ children }) => {
    return (
        localStorage.getItem('jwt-token') ? children : <Navigate to={'/'} />
    );
};
export default ProtectedRoute;