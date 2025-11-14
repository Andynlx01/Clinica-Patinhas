import api from './api'
import { Veterinarian, ApiResponse } from '../types'
import { VeterinarianInput } from '../schemas'

export const getVeterinarians = async (): Promise<ApiResponse<Veterinarian[]>> => {
  return api.get('/veterinarians')
}

export const getVeterinarian = async (id: string): Promise<ApiResponse<Veterinarian>> => {
  return api.get(`/veterinarians/${id}`)
}

export const createVeterinarian = async (data: VeterinarianInput): Promise<ApiResponse<Veterinarian>> => {
  return api.post('/veterinarians', data)
}

export const updateVeterinarian = async (id: string, data: Partial<VeterinarianInput>): Promise<ApiResponse<Veterinarian>> => {
  return api.put(`/veterinarians/${id}`, data)
}

export const deleteVeterinarian = async (id: string): Promise<ApiResponse<void>> => {
  return api.delete(`/veterinarians/${id}`)
}

export const getVeterinariansBySpecialty = async (specialty: string): Promise<ApiResponse<Veterinarian[]>> => {
  return api.get(`/veterinarians/specialty/${specialty}`)
}

export const veterinarianService = {
  getAll: getVeterinarians,
  getById: getVeterinarian,
  create: createVeterinarian,
  update: updateVeterinarian,
  delete: deleteVeterinarian,
  getBySpecialty: getVeterinariansBySpecialty,
}
