import { Veterinarian, ApiResponse } from '../types';
import { VeterinarianInput } from '../schemas';
export declare const getVeterinarians: () => Promise<ApiResponse<Veterinarian[]>>;
export declare const getVeterinarian: (id: string) => Promise<ApiResponse<Veterinarian>>;
export declare const createVeterinarian: (data: VeterinarianInput) => Promise<ApiResponse<Veterinarian>>;
export declare const updateVeterinarian: (id: string, data: Partial<VeterinarianInput>) => Promise<ApiResponse<Veterinarian>>;
export declare const deleteVeterinarian: (id: string) => Promise<ApiResponse<void>>;
export declare const getVeterinariansBySpecialty: (specialty: string) => Promise<ApiResponse<Veterinarian[]>>;
export declare const veterinarianService: {
    getAll: () => Promise<ApiResponse<Veterinarian[]>>;
    getById: (id: string) => Promise<ApiResponse<Veterinarian>>;
    create: (data: VeterinarianInput) => Promise<ApiResponse<Veterinarian>>;
    update: (id: string, data: Partial<VeterinarianInput>) => Promise<ApiResponse<Veterinarian>>;
    delete: (id: string) => Promise<ApiResponse<void>>;
    getBySpecialty: (specialty: string) => Promise<ApiResponse<Veterinarian[]>>;
};
