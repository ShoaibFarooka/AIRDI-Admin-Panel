import React from 'react';
import '../styles/ProtectedRoute.css';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';
import Sidebar from './Sidebar';

const ProtectedRoute = ({ children, showSidebar, ...rest }) => {
    const location = useLocation();
    const isAuth = isAuthenticated();

    return isAuth ? (
        <div className='page'>
            {showSidebar && <Sidebar />}
            <div className={showSidebar ? 'body-content' : ''}>
                {React.cloneElement(children, { ...rest })}
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default ProtectedRoute;
