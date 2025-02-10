import React from 'react';
import { useAuth } from '@hooks/useAutentication';

const Logout: React.FC = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>Cerrar sesión</button>
    );
};

export default Logout;
