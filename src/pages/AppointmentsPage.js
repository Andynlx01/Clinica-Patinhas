import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { appointmentService } from '../services/appointment.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentSchema } from '../schemas';
import { Plus, X } from 'lucide-react';
export default function AppointmentsPage() {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(AppointmentSchema),
    });
    const onSubmit = async (data) => {
        await appointmentService.create(data);
        reset();
        setShowModal(false);
    };
    const handleCancel = async (id) => {
        if (confirm('Deseja cancelar esta consulta?')) {
            await appointmentService.cancel(id);
        }
    };
    const filteredAppointments = appointments.filter(apt => apt.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Consultas" }), _jsxs("button", { onClick: () => {
                            reset();
                            setShowModal(true);
                        }, className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2", children: [_jsx(Plus, { size: 20 }), " Nova Consulta"] })] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", placeholder: "Pesquisar por paciente...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-4 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }) }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-card p-8 rounded-lg max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Nova Consulta" }), _jsx("button", { onClick: () => setShowModal(false), children: _jsx(X, { size: 24 }) })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Paciente" }), _jsx("select", { ...register('patientId'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none", children: _jsx("option", { value: "", children: "Selecionar" }) }), errors.patientId && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.patientId.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Veterin\u00E1rio" }), _jsx("select", { ...register('veterinarianId'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none", children: _jsx("option", { value: "", children: "Selecionar" }) }), errors.veterinarianId && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.veterinarianId.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Servi\u00E7o" }), _jsx("select", { ...register('serviceId'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none", children: _jsx("option", { value: "", children: "Selecionar" }) }), errors.serviceId && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.serviceId.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Data e Hora" }), _jsx("input", { ...register('scheduledDate'), type: "datetime-local", className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }), errors.scheduledDate && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.scheduledDate.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Observa\u00E7\u00F5es" }), _jsx("textarea", { ...register('notes'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none", rows: 3 })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "button", onClick: () => {
                                                setShowModal(false);
                                                reset();
                                            }, className: "flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition", children: "Cancelar" }), _jsx("button", { type: "submit", className: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition", children: "Agendar" })] })] })] }) })), _jsx("div", { className: "space-y-4", children: filteredAppointments.length === 0 ? (_jsx("div", { className: "bg-card p-8 rounded-lg text-center text-muted-foreground border border-border", children: "Nenhuma consulta agendada" })) : (filteredAppointments.map((appointment) => (_jsx("div", { className: "bg-card p-6 rounded-lg border border-border hover:shadow-lg transition", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold", children: appointment.patient?.name }), _jsx("p", { className: "text-muted-foreground", children: new Date(appointment.scheduledDate).toLocaleString('pt-BR') }), _jsx("p", { className: "text-sm mt-2", children: appointment.service?.name })] }), _jsx("button", { onClick: () => handleCancel(appointment.id), className: "px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition", children: "Cancelar" })] }) }, appointment.id)))) })] }));
}
