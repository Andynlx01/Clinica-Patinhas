import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../schemas';
export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
    });
    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await login(data.email, data.password);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.message || 'Erro ao fazer login');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4", children: _jsxs("div", { className: "bg-card p-8 rounded-lg shadow-2xl w-full max-w-md", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-8", children: "Cl\u00EDnica Patinhas" }), error && (_jsx("div", { className: "bg-destructive/10 text-destructive p-4 rounded-lg mb-6", children: error })), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { ...register('email'), type: "email", placeholder: "seu@email.com", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.email && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.email.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Senha" }), _jsx("input", { ...register('password'), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.password && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.password.message })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50", children: isLoading ? 'Entrando...' : 'Entrar' })] }), _jsxs("p", { className: "text-center text-muted-foreground mt-6", children: ["N\u00E3o tem conta?", ' ', _jsx(Link, { to: "/signup", className: "text-primary font-semibold hover:underline", children: "Cadastre-se" })] })] }) }));
}
