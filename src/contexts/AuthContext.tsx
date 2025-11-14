import { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import { authService } from '../services/auth.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          const response = await authService.getCurrentUser()
          if (response.success && response.data) {
            setUser(response.data)
          } else {
            localStorage.removeItem('authToken')
          }
        } catch {
          localStorage.removeItem('authToken')
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.login({ email, password })
      if (response.success && response.data) {
        localStorage.setItem('authToken', response.data.token)
        setUser(response.data.user)
      } else {
        throw new Error(response.error || 'Erro ao fazer login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.signup({
        name,
        email,
        phone,
        password,
        confirmPassword: password,
      })
      if (response.success && response.data) {
        localStorage.setItem('authToken', response.data.token)
        setUser(response.data.user)
      } else {
        throw new Error(response.error || 'Erro ao se registrar')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      const response = await authService.updateProfile(data)
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        throw new Error(response.error || 'Erro ao atualizar perfil')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
