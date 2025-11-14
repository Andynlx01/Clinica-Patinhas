import { useState, useCallback } from 'react'
import { ApiResponse, ApiError } from '../types'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const response = await apiCall()
      if (response.success && response.data) {
        setState({ data: response.data, loading: false, error: null })
        return response.data
      } else {
        const error: ApiError = {
          message: response.error || 'Erro desconhecido',
          code: 'API_ERROR',
        }
        setState({ data: null, loading: false, error })
        return null
      }
    } catch (err: any) {
      const error: ApiError = {
        message: err.message || 'Erro ao processar requisição',
        code: err.code || 'UNKNOWN_ERROR',
      }
      setState({ data: null, loading: false, error })
      return null
    }
  }, [apiCall])

  return { ...state, execute }
}
