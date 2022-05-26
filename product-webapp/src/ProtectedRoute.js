import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { toast } from 'react-toastify';
const ProtectedRoute = ({ redirectPath = '/' }) => {
    return localStorage.getItem('jwt-token')
        ?
        <Outlet />
        :
        <Navigate to={redirectPath} replace />

};
export default ProtectedRoute;