import { ApiResponse } from '../types';
declare class ApiService {
    private client;
    constructor();
    get<T>(url: string): Promise<ApiResponse<T>>;
    post<T>(url: string, data: any): Promise<ApiResponse<T>>;
    put<T>(url: string, data: any): Promise<ApiResponse<T>>;
    delete<T>(url: string): Promise<ApiResponse<T>>;
    private handleError;
}
declare const _default: ApiService;
export default _default;
