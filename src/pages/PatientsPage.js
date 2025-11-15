import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { patientService } from '../services/patient.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientSchema } from '../schemas';
import { Plus, Trash2, Edit2 } from 'lucide-react';
export default function PatientsPage() {
    const [showModal, setShowModal] = useState(false);
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(PatientSchema),
    });
    const onSubmit = async (data) => {
        if (editingId) {
            await patientService.update(editingId, data);
            setEditingId(null);
        }
        else {
            await patientService.create(data);
        }
        reset();
        setShowModal(false);
    };
    const handleDelete = async (id) => {
        if (confirm('Deseja excluir este paciente?')) {
            await patientService.delete(id);
        }
    };
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Pacientes" }), _jsxs("button", { onClick: () => {
                            setEditingId(null);
                            reset();
                            setShowModal(true);
                        }, className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2", children: [_jsx(Plus, { size: 20 }), " Novo Paciente"] })] }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-card p-8 rounded-lg max-w-md w-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: editingId ? 'Editar Paciente' : 'Novo Paciente' }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Nome" }), _jsx("input", { ...register('name'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }), errors.name && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.name.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Esp\u00E9cie" }), _jsxs("select", { ...register('species'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none", children: [_jsx("option", { value: "", children: "Selecionar" }), _jsx("option", { value: "cachorro", children: "Cachorro" }), _jsx("option", { value: "gato", children: "Gato" }), _jsx("option", { value: "coelho", children: "Coelho" }), _jsx("option", { value: "hamster", children: "Hamster" }), _jsx("option", { value: "passaro", children: "P\u00E1ssaro" })] }), errors.species && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.species.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Ra\u00E7a" }), _jsx("input", { ...register('breed'), className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }), errors.breed && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.breed.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Peso (kg)" }), _jsx("input", { ...register('weight', { valueAsNumber: true }), type: "number", step: "0.1", className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }), errors.weight && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.weight.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Data de Nascimento" }), _jsx("input", { ...register('birthDate'), type: "date", className: "w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none" }), errors.birthDate && _jsx("p", { className: "text-destructive text-sm mt-1", children: errors.birthDate.message })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "button", onClick: () => {
                                                setShowModal(false);
                                                reset();
                                            }, className: "flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition", children: "Cancelar" }), _jsx("button", { type: "submit", className: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition", children: editingId ? 'Atualizar' : 'Criar' })] })] })] }) })), _jsx("div", { className: "bg-card rounded-lg shadow border border-border overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-muted border-b border-border", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold", children: "Nome" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold", children: "Esp\u00E9cie" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold", children: "Ra\u00E7a" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold", children: "Peso" }), _jsx("th", { className: "px-6 py-3 text-left text-sm font-semibold", children: "A\u00E7\u00F5es" })] }) }), _jsx("tbody", { className: "divide-y divide-border", children: patients.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-6 py-8 text-center text-muted-foreground", children: "Nenhum paciente cadastrado" }) })) : (patients.map((patient) => (_jsxs("tr", { className: "hover:bg-muted/50 transition", children: [_jsx("td", { className: "px-6 py-4", children: patient.name }), _jsx("td", { className: "px-6 py-4", children: patient.species }), _jsx("td", { className: "px-6 py-4", children: patient.breed }), _jsxs("td", { className: "px-6 py-4", children: [patient.weight, " kg"] }), _jsxs("td", { className: "px-6 py-4 flex gap-2", children: [_jsx("button", { onClick: () => {
                                                    setEditingId(patient.id);
                                                    setShowModal(true);
                                                }, className: "p-2 hover:bg-primary/10 text-primary rounded transition", children: _jsx(Edit2, { size: 18 }) }), _jsx("button", { onClick: () => handleDelete(patient.id), className: "p-2 hover:bg-destructive/10 text-destructive rounded transition", children: _jsx(Trash2, { size: 18 }) })] })] }, patient.id)))) })] }) })] }));
}
