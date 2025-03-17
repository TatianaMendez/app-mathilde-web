import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { AuthorizationService } from '~/services/authorizationService';

interface User {
    username: string;
    token?: string;
}

interface UseAuthentication {
    user: User | null;
        login: (usuario: string, password: string) => Promise<void>;
        logout: () => void;
    error: string | null; 
}

const AuthContext = createContext<UseAuthentication | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                localStorage.removeItem('user');
                setUser(null);
            }
        }
    }, []);

    const login = async (usuario: string, password: string) => {
        try {
            const authResponse = await AuthorizationService.authenticate();
            
            const response = await axios.post(
                'https://ygskuqceol.execute-api.us-east-2.amazonaws.com/dev/mathilde-ads/servicios',
                { usuario, password, accion: 'login'},
                {
                    headers: {
                        'Authorization': `Bearer ${authResponse.token}`
                    }
                }
            );

            if (response.data && response.data.statusCode === 200) {
                const userData = {
                    username: response.data.body.Bddftt,
                    token: authResponse.token
                };
                
                if (!userData.username) {
                    throw new Error("El nombre de usuario no está disponible en la respuesta.");
                }

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`;
                setError(null);
                navigate('/dashboard');
            } else {
                throw new Error("Respuesta del servidor inválida");
            }
            
        } catch (error) {   
            let errorMessage = "Error de inicio de sesión. Verifica tus credenciales.";
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = `Error: ${error.response.status} - ${error.response.data.message || error.response.data}`;
                } else if (error.request) {
                    errorMessage = "No se recibió respuesta del servidor.";
                } else {
                    errorMessage = `Error de configuración: ${error.message}`;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError(errorMessage);
            Swal.fire({
                title: 'Error de inicio de sesión',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
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
