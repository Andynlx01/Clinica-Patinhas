import { Patient, ApiResponse } from '../types';
import { PatientInput } from '../schemas';
export declare const getPatients: () => Promise<ApiResponse<Patient[]>>;
export declare const getPatient: (id: string) => Promise<ApiResponse<Patient>>;
export declare const createPatient: (data: PatientInput) => Promise<ApiResponse<Patient>>;
export declare const updatePatient: (id: string, data: Partial<PatientInput>) => Promise<ApiResponse<Patient>>;
export declare const deletePatient: (id: string) => Promise<ApiResponse<void>>;
export declare const uploadPatientPhoto: (id: string, file: File) => Promise<ApiResponse<{
    photoUrl: string;
}>>;
export declare const patientService: {
    getAll: () => Promise<ApiResponse<Patient[]>>;
    getById: (id: string) => Promise<ApiResponse<Patient>>;
    create: (data: PatientInput) => Promise<ApiResponse<Patient>>;
    update: (id: string, data: Partial<PatientInput>) => Promise<ApiResponse<Patient>>;
    delete: (id: string) => Promise<ApiResponse<void>>;
    uploadPhoto: (id: string, file: File) => Promise<ApiResponse<{
        photoUrl: string;
    }>>;
};
