import { Appointment, ApiResponse } from '../types';
import { AppointmentInput } from '../schemas';
export declare const getAppointments: () => Promise<ApiResponse<Appointment[]>>;
export declare const getAppointment: (id: string) => Promise<ApiResponse<Appointment>>;
export declare const createAppointment: (data: AppointmentInput) => Promise<ApiResponse<Appointment>>;
export declare const updateAppointment: (id: string, data: Partial<AppointmentInput>) => Promise<ApiResponse<Appointment>>;
export declare const cancelAppointment: (id: string) => Promise<ApiResponse<void>>;
export declare const deleteAppointment: (id: string) => Promise<ApiResponse<void>>;
export declare const searchAppointments: (query: string) => Promise<ApiResponse<Appointment[]>>;
export declare const appointmentService: {
    getAll: () => Promise<ApiResponse<Appointment[]>>;
    getById: (id: string) => Promise<ApiResponse<Appointment>>;
    create: (data: AppointmentInput) => Promise<ApiResponse<Appointment>>;
    update: (id: string, data: Partial<AppointmentInput>) => Promise<ApiResponse<Appointment>>;
    cancel: (id: string) => Promise<ApiResponse<void>>;
    delete: (id: string) => Promise<ApiResponse<void>>;
    search: (query: string) => Promise<ApiResponse<Appointment[]>>;
};
