import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Heart, Droplets, Scissors, Zap, Eye, Bluetooth as Tooth } from 'lucide-react';
export default function HomePage() {
    const navigate = useNavigate();
    const services = [
        {
            icon: Heart,
            name: 'Consultas',
            description: 'Avaliação clínica completa do seu pet',
            price: 'R$ 150,00',
        },
        {
            icon: Droplets,
            name: 'Vacinação',
            description: 'Proteção completa do seu animal',
            price: 'A partir de R$ 80,00',
        },
        {
            icon: Scissors,
            name: 'Banho e Tosa',
            description: 'Higiene e embelezamento profissional',
            price: 'A partir de R$ 100,00',
        },
        {
            icon: Zap,
            name: 'Cirurgia',
            description: 'Procedimentos cirúrgicos especializados',
            price: 'Consultar',
        },
        {
            icon: Eye,
            name: 'Ultrassom',
            description: 'Diagnóstico por imagem avançado',
            price: 'R$ 200,00',
        },
        {
            icon: Tooth,
            name: 'Limpeza Dental',
            description: 'Saúde bucal completa para seu pet',
            price: 'R$ 180,00',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-background to-muted", children: [_jsx("div", { className: "bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20 px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-5xl font-bold mb-6", children: "Bem-vindo \u00E0 Cl\u00EDnica Patinhas" }), _jsx("p", { className: "text-xl mb-8", children: "Cuidado veterin\u00E1rio completo e profissional para seu pet" }), _jsx("button", { onClick: () => navigate('/login'), className: "bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition", children: "Come\u00E7ar Agora" })] }) }), _jsxs("div", { className: "max-w-6xl mx-auto py-20 px-4", children: [_jsx("h2", { className: "text-4xl font-bold text-center mb-12", children: "Nossos Servi\u00E7os" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((service) => (_jsxs("div", { className: "bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition", children: [_jsx(service.icon, { className: "w-12 h-12 text-primary mb-4" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: service.name }), _jsx("p", { className: "text-muted-foreground mb-4", children: service.description }), _jsx("p", { className: "text-lg font-bold text-primary", children: service.price })] }, service.name))) })] }), _jsx("div", { className: "bg-card border-t border-border py-20 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Entre em Contato" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 text-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "Telefone" }), _jsx("p", { children: "(83) 3333-0000" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "Endere\u00E7o" }), _jsx("p", { children: "Rua das Patas, 123 - Jo\u00E3o Pessoa, PB" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "Redes Sociais" }), _jsx("p", { children: "@ClinicaPatinhas" })] })] })] }) })] }));
}
