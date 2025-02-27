import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/services/autenticationService';

const RouterLogueado: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth(); 

    if (!user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>; 
};

export default RouterLogueado;
