import { useState, useCallback } from 'react';
export function useApi(apiCall) {
    const [state, setState] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const execute = useCallback(async () => {
        setState({ data: null, loading: true, error: null });
        try {
            const response = await apiCall();
            if (response.success && response.data) {
                setState({ data: response.data, loading: false, error: null });
                return response.data;
            }
            else {
                const error = {
                    message: response.error || 'Erro desconhecido',
                    code: 'API_ERROR',
                };
                setState({ data: null, loading: false, error });
                return null;
            }
        }
        catch (err) {
            const error = {
                message: err.message || 'Erro ao processar requisição',
                code: err.code || 'UNKNOWN_ERROR',
            };
            setState({ data: null, loading: false, error });
            return null;
        }
    }, [apiCall]);
    return { ...state, execute };
}
