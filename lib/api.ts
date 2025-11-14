/**
 * API Service Layer
 * Centraliza todas as chamadas de API
 * Pronto para integração com endpoints reais
 */

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface Patient {
  id: string
  name: string
  species: string
  breed: string
  owner: string
  phone: string
  age: number
  weight: number
  image?: string
  createdAt?: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientImage?: string
  date: string
  time: string
  veterinarian: string
  specialtyId: string
  specialty: string
  diagnosis: string
  status: "scheduled" | "completed" | "cancelled"
  patientSpecies?: string
}

export interface Veterinarian {
  id: string
  name: string
  specialty: string
  specialtyId: string
  image?: string
  phone?: string
  email?: string
}

export interface Vaccination {
  id: string
  name: string
  description: string
  basePrice: number
  species: string[]
  image?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "veterinarian" | "receptionist"
  image?: string
  createdAt?: string
}

// API Base URL - Configure conforme seu backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Configuração de headers padrão
const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

// Função genérica de fetch com tratamento de erro
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(token),
    })

    if (!response.ok) {
      const error = await response.json()
      return { data: null, error: error.message || `Erro ${response.status}` }
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: (error as Error).message || "Erro ao conectar com servidor" }
  }
}

// ============================================
// PATIENTS ENDPOINTS
// ============================================

export const patientsAPI = {
  getAll: async (token?: string) => {
    return fetchAPI<Patient[]>("/patients", { method: "GET" }, token)
  },

  getById: async (id: string, token?: string) => {
    return fetchAPI<Patient>(`/patients/${id}`, { method: "GET" }, token)
  },

  create: async (patient: Omit<Patient, "id">, token?: string) => {
    return fetchAPI<Patient>("/patients", { method: "POST", body: JSON.stringify(patient) }, token)
  },

  update: async (id: string, patient: Partial<Patient>, token?: string) => {
    return fetchAPI<Patient>(`/patients/${id}`, { method: "PUT", body: JSON.stringify(patient) }, token)
  },

  delete: async (id: string, token?: string) => {
    return fetchAPI<void>(`/patients/${id}`, { method: "DELETE" }, token)
  },

  uploadImage: async (id: string, file: File, token?: string) => {
    const formData = new FormData()
    formData.append("image", file)

    const headers = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}/patients/${id}/image`, {
        method: "POST",
        body: formData,
        headers,
      })

      if (!response.ok) {
        const error = await response.json()
        return { data: null, error: error.message || "Erro ao fazer upload" }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: (error as Error).message || "Erro ao fazer upload" }
    }
  },
}

// ============================================
// APPOINTMENTS ENDPOINTS
// ============================================

export const appointmentsAPI = {
  getAll: async (token?: string) => {
    return fetchAPI<Appointment[]>("/appointments", { method: "GET" }, token)
  },

  getById: async (id: string, token?: string) => {
    return fetchAPI<Appointment>(`/appointments/${id}`, { method: "GET" }, token)
  },

  getByPatient: async (patientId: string, token?: string) => {
    return fetchAPI<Appointment[]>(`/appointments?patientId=${patientId}`, { method: "GET" }, token)
  },

  create: async (appointment: Omit<Appointment, "id">, token?: string) => {
    return fetchAPI<Appointment>("/appointments", { method: "POST", body: JSON.stringify(appointment) }, token)
  },

  update: async (id: string, appointment: Partial<Appointment>, token?: string) => {
    return fetchAPI<Appointment>(
      `/appointments/${id}`,
      { method: "PUT", body: JSON.stringify(appointment) },
      token,
    )
  },

  delete: async (id: string, token?: string) => {
    return fetchAPI<void>(`/appointments/${id}`, { method: "DELETE" }, token)
  },

  search: async (query: string, token?: string) => {
    return fetchAPI<Appointment[]>(`/appointments/search?q=${encodeURIComponent(query)}`, { method: "GET" }, token)
  },
}

// ============================================
// VETERINARIANS ENDPOINTS
// ============================================

export const veterinariansAPI = {
  getAll: async (token?: string) => {
    return fetchAPI<Veterinarian[]>("/veterinarians", { method: "GET" }, token)
  },

  getBySpecialty: async (specialtyId: string, token?: string) => {
    return fetchAPI<Veterinarian[]>(`/veterinarians?specialty=${specialtyId}`, { method: "GET" }, token)
  },

  getById: async (id: string, token?: string) => {
    return fetchAPI<Veterinarian>(`/veterinarians/${id}`, { method: "GET" }, token)
  },
}

// ============================================
// VACCINATIONS ENDPOINTS
// ============================================

export const vaccinationsAPI = {
  getAll: async (token?: string) => {
    return fetchAPI<Vaccination[]>("/vaccinations", { method: "GET" }, token)
  },

  getBySpecies: async (species: string, token?: string) => {
    return fetchAPI<Vaccination[]>(`/vaccinations?species=${encodeURIComponent(species)}`, { method: "GET" }, token)
  },
}

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  signup: async (email: string, password: string, name: string) => {
    return fetchAPI<{ token: string; user: User }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })
  },

  logout: async (token?: string) => {
    return fetchAPI<void>("/auth/logout", { method: "POST" }, token)
  },

  getProfile: async (token?: string) => {
    return fetchAPI<User>("/auth/profile", { method: "GET" }, token)
  },

  updateProfile: async (user: Partial<User>, token?: string) => {
    return fetchAPI<User>("/auth/profile", { method: "PUT", body: JSON.stringify(user) }, token)
  },
}
