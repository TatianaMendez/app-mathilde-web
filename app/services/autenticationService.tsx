import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState, type AppDispatch, login, logout, loginFailure } from '@store/store';
import Swal from 'sweetalert2';

interface User {
    username: string;
    expiresAt?: number;
}

interface UseAuthentication {
    user: User | null;
    handleLogin: (user: string, pass: string) => Promise<void>;
    handleLogout: () => void;
    error: string | null; 
}

const AuthContext = createContext<UseAuthentication | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const getInitialUser = (): User | null => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.expiresAt && parsedUser.expiresAt > Date.now()) {
                    dispatch(login({ email: parsedUser.username, name: parsedUser.username }));
                    return { username: parsedUser.username, expiresAt: parsedUser.expiresAt };
                } else {
                    localStorage.removeItem('user');
                    dispatch(logout());
                }
            } catch (error) {
                localStorage.removeItem('user');
                dispatch(logout());
            }
        }
        return null;
    };

    const [user, setUserState] = useState<User | null>(getInitialUser);

    useEffect(() => {
        const checkSession = () => {
            const currentUser = getInitialUser();
            if (!currentUser) {
                handleLogout();
            }
        };

        const interval = setInterval(checkSession, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (user: string, pass: string) => {
        try {
            const response = await axios.post(
                'https://mthmocks.pruebasmathilde.com/castlemock/mock/rest/project/nIVSsr/application/YPlsJX/login',
                { user, pass }
            );

            if (response.data && response.data.username) {
                const session = {
                    username: response.data.username,
                    expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 horas
                };
                setUserState({ username: response.data.username, expiresAt: session.expiresAt });
                localStorage.setItem('user', JSON.stringify(session));
                dispatch(login({ email: response.data.username, name: response.data.username }));
                navigate('/dashboard');
                setError(null);
            } else {
                throw new Error("El nombre de usuario no está disponible en la respuesta.");
            }
        } catch (error) {   
            if (axios.isAxiosError(error)) {
                dispatch(loginFailure(error.message));
                if (error.response) {
                    setError(`Error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    setError("No se recibió respuesta del servidor.");
                } else {
                    setError(`Error de configuración: ${error.message}`);
                }
            } else {
                dispatch(loginFailure('Error de inicio de sesión. Verifica tus credenciales.'));
                setError("Error de inicio de sesión. Verifica tus credenciales.");
            }

            Swal.fire({
                title: 'Error de inicio de sesión',
                text: 'Por favor verifica tus credenciales.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setUserState(null);
        localStorage.removeItem('user'); 
        sessionStorage.removeItem('Campaign');
        sessionStorage.removeItem('campaignDataResumen');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): UseAuthentication => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export { useAuth };
