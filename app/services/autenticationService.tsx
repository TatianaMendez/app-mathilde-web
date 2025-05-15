import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState, type AppDispatch, login, logout, loginFailure } from '@store/store';
import Swal from 'sweetalert2';
import { AuthorizationService } from './authorizationService';

interface User {
    username: string;
    expiresAt?: number;
}

interface UseAuthentication {
    user: User | null;
    handleLogin: (username: string, password: string, recaptchaToken?: string) => Promise<void>;
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

    const handleLogin = async (username: string, password: string, recaptchaToken?: string) => {
        try {
            console.log("recaptchaToken", recaptchaToken);
            const authResponse = await AuthorizationService.authenticate(recaptchaToken);
            
            if (authResponse.error) {
                throw new Error(authResponse.error);
            }

            if (!authResponse.token) {
                throw new Error('No se pudo obtener el token de autorización');
            }

            console.log("Token obtenido:", authResponse.token);
            sessionStorage.setItem('tokCog', authResponse.token);

            const response = await axios.post(
                'https://ygskuqceol.execute-api.us-east-2.amazonaws.com/dev/mathilde-ads/servicios',
                { username, password, 'action': 'login' },
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authResponse.token}`
                    }
                }
            );

            console.log("Respuesta del servicio de login:", response.data);

            if (response.data && response.data.ClientName) {
                const session = {
                    username: username,
                    ClientName: response.data.ClientName,
                    expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 horas
                };
                console.log("Datos de sesión creados:", session);
                
                setUserState({ username: response.data.ClientName, expiresAt: session.expiresAt });
                localStorage.setItem('user', JSON.stringify(session));
                dispatch(login({ email: username, name: response.data.ClientName }));
                navigate('/dashboard');
                setError(null);
            } else {
                throw new Error(response.data.detail);
            }
        } catch (error) {   
            console.error("Error completo:", error);
            
            if (axios.isAxiosError(error)) {
                console.error("Detalles del error:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                
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
                text: error instanceof Error ? error.message : 'Por favor verifica tus credenciales.',
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
