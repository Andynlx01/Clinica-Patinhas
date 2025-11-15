import api from './api';
export const login = async (input) => {
    return api.post('/auth/login', input);
};
export const signup = async (input) => {
    return api.post('/auth/signup', input);
};
export const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    return { success: true };
};
export const getCurrentUser = async () => {
    return api.get('/auth/me');
};
export const updateProfile = async (data) => {
    return api.put('/auth/profile', data);
};
export const authService = {
    login,
    signup,
    logout,
    getCurrentUser,
    updateProfile,
};
