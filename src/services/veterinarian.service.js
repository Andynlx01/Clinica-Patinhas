import api from './api';
export const getVeterinarians = async () => {
    return api.get('/veterinarians');
};
export const getVeterinarian = async (id) => {
    return api.get(`/veterinarians/${id}`);
};
export const createVeterinarian = async (data) => {
    return api.post('/veterinarians', data);
};
export const updateVeterinarian = async (id, data) => {
    return api.put(`/veterinarians/${id}`, data);
};
export const deleteVeterinarian = async (id) => {
    return api.delete(`/veterinarians/${id}`);
};
export const getVeterinariansBySpecialty = async (specialty) => {
    return api.get(`/veterinarians/specialty/${specialty}`);
};
export const veterinarianService = {
    getAll: getVeterinarians,
    getById: getVeterinarian,
    create: createVeterinarian,
    update: updateVeterinarian,
    delete: deleteVeterinarian,
    getBySpecialty: getVeterinariansBySpecialty,
};
