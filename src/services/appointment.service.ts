import api from './api'
import { Appointment, ApiResponse } from '../types'
import { AppointmentInput } from '../schemas'

export const getAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
  return api.get('/appointments')
}

export const getAppointment = async (id: string): Promise<ApiResponse<Appointment>> => {
  return api.get(`/appointments/${id}`)
}

export const createAppointment = async (data: AppointmentInput): Promise<ApiResponse<Appointment>> => {
  return api.post('/appointments', data)
}

export const updateAppointment = async (id: string, data: Partial<AppointmentInput>): Promise<ApiResponse<Appointment>> => {
  return api.put(`/appointments/${id}`, data)
}

export const cancelAppointment = async (id: string): Promise<ApiResponse<void>> => {
  return api.put(`/appointments/${id}`, { status: 'cancelled' })
}

export const deleteAppointment = async (id: string): Promise<ApiResponse<void>> => {
  return api.delete(`/appointments/${id}`)
}

export const searchAppointments = async (query: string): Promise<ApiResponse<Appointment[]>> => {
  return api.get(`/appointments/search?q=${query}`)
}

export const appointmentService = {
  getAll: getAppointments,
  getById: getAppointment,
  create: createAppointment,
  update: updateAppointment,
  cancel: cancelAppointment,
  delete: deleteAppointment,
  search: searchAppointments,
}
