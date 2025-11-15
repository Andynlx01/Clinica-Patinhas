import api from './api';
export const getServices = async () => {
    return api.get('/services');
};
export const getService = async (id) => {
    return api.get(`/services/${id}`);
};
export const createService = async (data) => {
    return api.post('/services', data);
};
export const updateService = async (id, data) => {
    return api.put(`/services/${id}`, data);
};
export const deleteService = async (id) => {
    return api.delete(`/services/${id}`);
};
export const serviceService = {
    getAll: getServices,
    getById: getService,
    create: createService,
    update: updateService,
    delete: deleteService,
};
