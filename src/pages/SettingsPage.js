import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function SettingsPage() {
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newTheme);
    };
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Configura\u00E7\u00F5es" }), _jsxs("div", { className: "bg-card p-6 rounded-lg border border-border max-w-md space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Modo Escuro" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Ativar tema escuro" })] }), _jsx("button", { onClick: toggleTheme, className: `relative w-12 h-6 rounded-full transition ${isDark ? 'bg-primary' : 'bg-border'}`, children: _jsx("div", { className: `absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0.5'}` }) })] }), _jsxs("div", { className: "border-t border-border pt-6", children: [_jsx("p", { className: "font-semibold mb-2", children: "Informa\u00E7\u00F5es do Sistema" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Vers\u00E3o 1.0.0" })] })] })] }));
}
