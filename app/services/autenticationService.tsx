import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

interface User {
    username: string;
}

interface UseAuthentication {
    user: User | null;
    login: (user: string, pass: string) => Promise<void>;
    logout: () => void;
    error: string | null; 
}

const AuthContext = createContext<UseAuthentication | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const getInitialUser = (): User | null => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (!parsedUser.expiresAt || parsedUser.expiresAt > Date.now()) {
                    return { username: parsedUser.username };
                }
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
        return null;
    };

    const [user, setUserState] = useState<User | null>(getInitialUser);

    const login = async (user: string, pass: string) => {
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
                setUserState({ username: response.data.username });
                localStorage.setItem('user', JSON.stringify(session));
                navigate('/dashboard');
                setError(null);
            } else {
                throw new Error("El nombre de usuario no está disponible en la respuesta.");
            }
        } catch (error) {   
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(`Error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    setError("No se recibió respuesta del servidor.");
                } else {
                    setError(`Error de configuración: ${error.message}`);
                }
            } else {
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

    const logout = () => {
        setUserState(null);
        localStorage.removeItem('user'); 
        sessionStorage.removeItem('Campaign');
        sessionStorage.removeItem('campaignDataResumen');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): UseAuthentication => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
