import { ApiResponse, ApiError } from '../types';
export declare function useApi<T>(apiCall: () => Promise<ApiResponse<T>>): {
    execute: () => Promise<NonNullable<T> | null>;
    data: T | null;
    loading: boolean;
    error: ApiError | null;
};
