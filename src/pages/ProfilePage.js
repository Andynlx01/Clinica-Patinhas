import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
const ProfileSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(11),
});
export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        },
    });
    const onSubmit = async (data) => {
        try {
            await updateProfile(data);
            setMessage('Perfil atualizado com sucesso');
            setIsEditing(false);
            setTimeout(() => setMessage(''), 3000);
        }
        catch (error) {
            setMessage('Erro ao atualizar perfil');
        }
    };
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Meu Perfil" }), message && (_jsx("div", { className: `p-4 rounded-lg mb-6 ${message.includes('sucesso') ? 'bg-green-500/10 text-green-700' : 'bg-destructive/10 text-destructive'}`, children: message })), _jsx("div", { className: "bg-card p-8 rounded-lg border border-border max-w-md", children: !isEditing ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Nome" }), _jsx("p", { className: "font-semibold", children: user?.name })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }), _jsx("p", { className: "font-semibold", children: user?.email })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Telefone" }), _jsx("p", { className: "font-semibold", children: user?.phone })] }), _jsx("button", { onClick: () => setIsEditing(true), className: "w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition", children: "Editar Perfil" })] })) : (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Nome" }), _jsx("input", { ...register('name'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { ...register('email'), type: "email", className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Telefone" }), _jsx("input", { ...register('phone'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "button", onClick: () => {
                                        setIsEditing(false);
                                        reset();
                                    }, className: "flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition", children: "Cancelar" }), _jsx("button", { type: "submit", className: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition", children: "Salvar" })] })] })) })] }));
}
