import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../schemas';
export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignupSchema),
    });
    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await signup(data.name, data.email, data.phone, data.password);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.message || 'Erro ao se registrar');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4", children: _jsxs("div", { className: "bg-card p-8 rounded-lg shadow-2xl w-full max-w-md", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-8", children: "Criar Conta" }), error && (_jsx("div", { className: "bg-destructive/10 text-destructive p-4 rounded-lg mb-6", children: error })), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Nome" }), _jsx("input", { ...register('name'), placeholder: "Seu nome", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.name && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.name.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { ...register('email'), type: "email", placeholder: "seu@email.com", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.email && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.email.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Telefone" }), _jsx("input", { ...register('phone'), placeholder: "(83) 9 9999-9999", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.phone && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.phone.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Senha" }), _jsx("input", { ...register('password'), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.password && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.password.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Confirmar Senha" }), _jsx("input", { ...register('confirmPassword'), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary" }), errors.confirmPassword && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.confirmPassword.message })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50", children: isLoading ? 'Criando conta...' : 'Criar Conta' })] }), _jsxs("p", { className: "text-center text-muted-foreground mt-6", children: ["J\u00E1 tem conta?", ' ', _jsx(Link, { to: "/login", className: "text-primary font-semibold hover:underline", children: "Fa\u00E7a login" })] })] }) }));
}
