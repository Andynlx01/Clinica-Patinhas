import api from './api'
import { User, ApiResponse } from '../types'
import { LoginInput, SignupInput } from '../schemas'

export const login = async (input: LoginInput): Promise<ApiResponse<{ user: User; token: string }>> => {
  return api.post('/auth/login', input)
}

export const signup = async (input: SignupInput): Promise<ApiResponse<{ user: User; token: string }>> => {
  return api.post('/auth/signup', input)
}

export const logout = async (): Promise<ApiResponse<void>> => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('currentUser')
  return { success: true }
}

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return api.get('/auth/me')
}

export const updateProfile = async (data: Partial<User>): Promise<ApiResponse<User>> => {
  return api.put('/auth/profile', data)
}

export const authService = {
  login,
  signup,
  logout,
  getCurrentUser,
  updateProfile,
}
