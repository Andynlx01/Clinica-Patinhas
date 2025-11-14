import api from './api'
import { Service, ApiResponse } from '../types'
import { ServiceInput } from '../schemas'

export const getServices = async (): Promise<ApiResponse<Service[]>> => {
  return api.get('/services')
}

export const getService = async (id: string): Promise<ApiResponse<Service>> => {
  return api.get(`/services/${id}`)
}

export const createService = async (data: ServiceInput): Promise<ApiResponse<Service>> => {
  return api.post('/services', data)
}

export const updateService = async (id: string, data: Partial<ServiceInput>): Promise<ApiResponse<Service>> => {
  return api.put(`/services/${id}`, data)
}

export const deleteService = async (id: string): Promise<ApiResponse<void>> => {
  return api.delete(`/services/${id}`)
}

export const serviceService = {
  getAll: getServices,
  getById: getService,
  create: createService,
  update: updateService,
  delete: deleteService,
}
