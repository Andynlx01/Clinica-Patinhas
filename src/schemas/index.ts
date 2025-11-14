import { z } from 'zod'

// Auth Schemas
export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const SignupSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(11, 'Telefone inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

// Patient Schemas
export const PatientSchema = z.object({
  name: z.string().min(2, 'Nome inválido'),
  species: z.string().min(1, 'Selecione uma espécie'),
  breed: z.string().min(2, 'Raça inválida'),
  weight: z.number().positive('Peso deve ser positivo'),
  birthDate: z.string().min(1, 'Data de nascimento inválida'),
  photo: z.string().optional(),
})

// Appointment Schemas
export const AppointmentSchema = z.object({
  patientId: z.string().min(1, 'Selecione um paciente'),
  veterinarianId: z.string().min(1, 'Selecione um veterinário'),
  serviceId: z.string().min(1, 'Selecione um serviço'),
  scheduledDate: z.string().min(1, 'Selecione uma data'),
  notes: z.string().optional(),
})

// Veterinarian Schemas
export const VeterinarianSchema = z.object({
  name: z.string().min(3, 'Nome inválido'),
  specialties: z.array(z.string()).min(1, 'Selecione ao menos uma especialidade'),
  phone: z.string().min(11, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  available: z.boolean(),
})

// Service Schemas
export const ServiceSchema = z.object({
  name: z.string().min(3, 'Nome inválido'),
  description: z.string().min(10, 'Descrição muito curta'),
  basePrice: z.number().positive('Preço deve ser positivo'),
  duration: z.number().positive('Duração deve ser positiva'),
})

export type LoginInput = z.infer<typeof LoginSchema>
export type SignupInput = z.infer<typeof SignupSchema>
export type PatientInput = z.infer<typeof PatientSchema>
export type AppointmentInput = z.infer<typeof AppointmentSchema>
export type VeterinarianInput = z.infer<typeof VeterinarianSchema>
export type ServiceInput = z.infer<typeof ServiceSchema>
