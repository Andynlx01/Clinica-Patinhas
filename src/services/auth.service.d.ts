import { User, ApiResponse } from '../types';
import { LoginInput, SignupInput } from '../schemas';
export declare const login: (input: LoginInput) => Promise<ApiResponse<{
    user: User;
    token: string;
}>>;
export declare const signup: (input: SignupInput) => Promise<ApiResponse<{
    user: User;
    token: string;
}>>;
export declare const logout: () => Promise<ApiResponse<void>>;
export declare const getCurrentUser: () => Promise<ApiResponse<User>>;
export declare const updateProfile: (data: Partial<User>) => Promise<ApiResponse<User>>;
export declare const authService: {
    login: (input: LoginInput) => Promise<ApiResponse<{
        user: User;
        token: string;
    }>>;
    signup: (input: SignupInput) => Promise<ApiResponse<{
        user: User;
        token: string;
    }>>;
    logout: () => Promise<ApiResponse<void>>;
    getCurrentUser: () => Promise<ApiResponse<User>>;
    updateProfile: (data: Partial<User>) => Promise<ApiResponse<User>>;
};
