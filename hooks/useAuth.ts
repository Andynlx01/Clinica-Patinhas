/**
 * Hook para gerenciar autenticação do usuário
 * Mantém token em localStorage e dados do usuário sincronizados
 */

import { useState, useCallback, useEffect } from "react"
import { authAPI, User } from "@/lib/api"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar token do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken) {
      setToken(storedToken)
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    const { data, error } = await authAPI.login(email, password)
    if (error) {
      setError(error)
      setLoading(false)
      return false
    }

    if (data) {
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("auth_user", JSON.stringify(data.user))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)

    const { data, error } = await authAPI.signup(email, password, name)
    if (error) {
      setError(error)
      setLoading(false)
      return false
    }

    if (data) {
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("auth_user", JSON.stringify(data.user))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }, [])

  const logout = useCallback(async () => {
    await authAPI.logout(token || undefined)
    setToken(null)
    setUser(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }, [token])

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn: !!token,
    login,
    signup,
    logout,
  }
}
