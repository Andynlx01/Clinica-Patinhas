import api from './api'
import { Patient, ApiResponse } from '../types'
import { PatientInput } from '../schemas'

export const getPatients = async (): Promise<ApiResponse<Patient[]>> => {
  return api.get('/patients')
}

export const getPatient = async (id: string): Promise<ApiResponse<Patient>> => {
  return api.get(`/patients/${id}`)
}

export const createPatient = async (data: PatientInput): Promise<ApiResponse<Patient>> => {
  return api.post('/patients', data)
}

export const updatePatient = async (id: string, data: Partial<PatientInput>): Promise<ApiResponse<Patient>> => {
  return api.put(`/patients/${id}`, data)
}

export const deletePatient = async (id: string): Promise<ApiResponse<void>> => {
  return api.delete(`/patients/${id}`)
}

export const uploadPatientPhoto = async (id: string, file: File): Promise<ApiResponse<{ photoUrl: string }>> => {
  const formData = new FormData()
  formData.append('photo', file)
  return api.post(`/patients/${id}/photo`, formData)
}

export const patientService = {
  getAll: getPatients,
  getById: getPatient,
  create: createPatient,
  update: updatePatient,
  delete: deletePatient,
  uploadPhoto: uploadPatientPhoto,
}
