import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const SignupSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    phone: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    name: string;
    phone: string;
    confirmPassword: string;
}>, {
    email: string;
    password: string;
    name: string;
    phone: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    name: string;
    phone: string;
    confirmPassword: string;
}>;
export declare const PatientSchema: z.ZodObject<{
    name: z.ZodString;
    species: z.ZodString;
    breed: z.ZodString;
    weight: z.ZodNumber;
    birthDate: z.ZodString;
    photo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    species: string;
    breed: string;
    weight: number;
    birthDate: string;
    photo?: string | undefined;
}, {
    name: string;
    species: string;
    breed: string;
    weight: number;
    birthDate: string;
    photo?: string | undefined;
}>;
export declare const AppointmentSchema: z.ZodObject<{
    patientId: z.ZodString;
    veterinarianId: z.ZodString;
    serviceId: z.ZodString;
    scheduledDate: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    patientId: string;
    veterinarianId: string;
    serviceId: string;
    scheduledDate: string;
    notes?: string | undefined;
}, {
    patientId: string;
    veterinarianId: string;
    serviceId: string;
    scheduledDate: string;
    notes?: string | undefined;
}>;
export declare const VeterinarianSchema: z.ZodObject<{
    name: z.ZodString;
    specialties: z.ZodArray<z.ZodString, "many">;
    phone: z.ZodString;
    email: z.ZodString;
    available: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    phone: string;
    specialties: string[];
    available: boolean;
}, {
    email: string;
    name: string;
    phone: string;
    specialties: string[];
    available: boolean;
}>;
export declare const ServiceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    duration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    basePrice: number;
    duration: number;
}, {
    name: string;
    description: string;
    basePrice: number;
    duration: number;
}>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type PatientInput = z.infer<typeof PatientSchema>;
export type AppointmentInput = z.infer<typeof AppointmentSchema>;
export type VeterinarianInput = z.infer<typeof VeterinarianSchema>;
export type ServiceInput = z.infer<typeof ServiceSchema>;
