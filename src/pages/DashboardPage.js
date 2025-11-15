import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, Calendar } from 'lucide-react';
export default function DashboardPage() {
    // Dados de exemplo - serão substituídos por chamadas reais
    const stats = [
        { label: 'Total de Pacientes', value: '24', icon: Users },
        { label: 'Consultas Agendadas', value: '8', icon: Calendar },
    ];
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Dashboard" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (_jsx("div", { className: "bg-card p-6 rounded-lg shadow border border-border", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground text-sm", children: stat.label }), _jsx("p", { className: "text-3xl font-bold text-primary", children: stat.value })] }), _jsx(Icon, { className: "w-12 h-12 text-primary/20" })] }) }, idx));
                }) }), _jsxs("div", { className: "bg-card p-6 rounded-lg shadow border border-border", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Pr\u00F3ximas Consultas" }), _jsx("p", { className: "text-muted-foreground", children: "Carregando dados..." })] })] }));
}
