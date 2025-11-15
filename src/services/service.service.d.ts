import { Service, ApiResponse } from '../types';
import { ServiceInput } from '../schemas';
export declare const getServices: () => Promise<ApiResponse<Service[]>>;
export declare const getService: (id: string) => Promise<ApiResponse<Service>>;
export declare const createService: (data: ServiceInput) => Promise<ApiResponse<Service>>;
export declare const updateService: (id: string, data: Partial<ServiceInput>) => Promise<ApiResponse<Service>>;
export declare const deleteService: (id: string) => Promise<ApiResponse<void>>;
export declare const serviceService: {
    getAll: () => Promise<ApiResponse<Service[]>>;
    getById: (id: string) => Promise<ApiResponse<Service>>;
    create: (data: ServiceInput) => Promise<ApiResponse<Service>>;
    update: (id: string, data: Partial<ServiceInput>) => Promise<ApiResponse<Service>>;
    delete: (id: string) => Promise<ApiResponse<void>>;
};
