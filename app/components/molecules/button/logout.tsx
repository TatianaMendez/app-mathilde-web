import React from 'react';
import { useAuth } from '@domain/services/autenticationService';

const Logout: React.FC = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>Cerrar sesión</button>
    );
};

export default Logout;
