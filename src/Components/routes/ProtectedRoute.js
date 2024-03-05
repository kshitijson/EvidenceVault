import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/localStorage";


const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/Login" replace />;
    }

    if (isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;