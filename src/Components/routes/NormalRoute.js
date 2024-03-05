import React from 'react'
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/localStorage';


function NormalRoute({ children }) {
    if (isLoggedIn()) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default NormalRoute