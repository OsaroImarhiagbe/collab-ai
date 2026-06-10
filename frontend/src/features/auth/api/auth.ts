import { api } from "@/api/apiClient"
import type { AuthResponse } from "../types/type"

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string,name:string) => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password,name});
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },
};