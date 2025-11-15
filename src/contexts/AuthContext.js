import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
export const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await authService.getCurrentUser();
                    if (response.success && response.data) {
                        setUser(response.data);
                    }
                    else {
                        localStorage.removeItem('authToken');
                    }
                }
                catch {
                    localStorage.removeItem('authToken');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await authService.login({ email, password });
            if (response.success && response.data) {
                localStorage.setItem('authToken', response.data.token);
                setUser(response.data.user);
            }
            else {
                throw new Error(response.error || 'Erro ao fazer login');
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    const signup = async (name, email, phone, password) => {
        setIsLoading(true);
        try {
            const response = await authService.signup({
                name,
                email,
                phone,
                password,
                confirmPassword: password,
            });
            if (response.success && response.data) {
                localStorage.setItem('authToken', response.data.token);
                setUser(response.data.user);
            }
            else {
                throw new Error(response.error || 'Erro ao se registrar');
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        await authService.logout();
        setUser(null);
    };
    const updateProfile = async (data) => {
        setIsLoading(true);
        try {
            const response = await authService.updateProfile(data);
            if (response.success && response.data) {
                setUser(response.data);
            }
            else {
                throw new Error(response.error || 'Erro ao atualizar perfil');
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            signup,
            logout,
            updateProfile,
        }, children: children }));
}
