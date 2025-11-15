import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export default function NotFoundPage() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-background", children: [_jsx("h1", { className: "text-6xl font-bold text-primary mb-4", children: "404" }), _jsx("p", { className: "text-2xl font-semibold mb-2", children: "P\u00E1gina n\u00E3o encontrada" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "A p\u00E1gina que voc\u00EA est\u00E1 procurando n\u00E3o existe." }), _jsx(Link, { to: "/", className: "px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition", children: "Voltar ao In\u00EDcio" })] }));
}
