import api from './api';
export const getPatients = async () => {
    return api.get('/patients');
};
export const getPatient = async (id) => {
    return api.get(`/patients/${id}`);
};
export const createPatient = async (data) => {
    return api.post('/patients', data);
};
export const updatePatient = async (id, data) => {
    return api.put(`/patients/${id}`, data);
};
export const deletePatient = async (id) => {
    return api.delete(`/patients/${id}`);
};
export const uploadPatientPhoto = async (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post(`/patients/${id}/photo`, formData);
};
export const patientService = {
    getAll: getPatients,
    getById: getPatient,
    create: createPatient,
    update: updatePatient,
    delete: deletePatient,
    uploadPhoto: uploadPatientPhoto,
};
