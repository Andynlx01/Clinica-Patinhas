export interface User {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  avatar?: string
  role: 'admin' | 'veterinarian' | 'client'
  createdAt: string
  updatedAt: string
}

export interface Patient {
  id: string
  name: string
  species: string
  breed: string
  weight: number
  birthDate: string
  photo?: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  veterinarianId: string
  serviceId: string
  scheduledDate: string
  diagnosis?: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Veterinarian {
  id: string
  name: string
  specialties: string[]
  phone: string
  email: string
  avatar?: string
  available: boolean
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  duration: number
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}
