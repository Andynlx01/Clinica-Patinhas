import axios, { AxiosError } from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
class ApiService {
    constructor() {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Add token to requests
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        // Handle errors
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        });
    }
    async get(url) {
        try {
            const response = await this.client.get(url);
            return response.data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async post(url, data) {
        try {
            const response = await this.client.post(url, data);
            return response.data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async put(url, data) {
        try {
            const response = await this.client.put(url, data);
            return response.data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async delete(url) {
        try {
            const response = await this.client.delete(url);
            return response.data;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    handleError(error) {
        const apiError = {
            message: 'Erro ao processar requisição',
            code: 'UNKNOWN_ERROR',
        };
        if (error instanceof AxiosError) {
            apiError.message = error.response?.data?.error || error.message;
            apiError.code = error.code || 'AXIOS_ERROR';
            apiError.details = error.response?.data;
        }
        console.error('[API Error]', apiError);
        return {
            success: false,
            error: apiError.message,
        };
    }
}
export default new ApiService();
