/**
 * Hook customizado para chamadas de API com loading e error states
 * Facilita gerenciamento de estados assíncronos
 */

import { useState, useCallback } from "react"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiFunction: (...args: any[]) => Promise<{ data: T | null; error: string | null }>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null })
      const { data, error } = await apiFunction(...args)
      setState({ data, loading: false, error })
      return { data, error }
    },
    [apiFunction],
  )

  return {
    ...state,
    execute,
  }
}
