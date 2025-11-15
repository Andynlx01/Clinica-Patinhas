import api from './api';
export const getAppointments = async () => {
    return api.get('/appointments');
};
export const getAppointment = async (id) => {
    return api.get(`/appointments/${id}`);
};
export const createAppointment = async (data) => {
    return api.post('/appointments', data);
};
export const updateAppointment = async (id, data) => {
    return api.put(`/appointments/${id}`, data);
};
export const cancelAppointment = async (id) => {
    return api.put(`/appointments/${id}`, { status: 'cancelled' });
};
export const deleteAppointment = async (id) => {
    return api.delete(`/appointments/${id}`);
};
export const searchAppointments = async (query) => {
    return api.get(`/appointments/search?q=${query}`);
};
export const appointmentService = {
    getAll: getAppointments,
    getById: getAppointment,
    create: createAppointment,
    update: updateAppointment,
    cancel: cancelAppointment,
    delete: deleteAppointment,
    search: searchAppointments,
};
