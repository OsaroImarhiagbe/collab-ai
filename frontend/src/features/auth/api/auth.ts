import { api } from "@/api/apiClient"
import type { Token } from "../types/type"

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<Token>('/auth/login', { email, password },{ withCredentials: true});
    return response.data
  },

  register: async (email: string, password: string,name:string) => {
    const resposne = await api.post<Token>('/auth/register', { email, password,name},{ withCredentials: true});
    console.log('AUTHSERVICE - result:', resposne)
    console.log('AUTHSERVICE - result.data:', resposne.data)
    return resposne.data
  },

  logout: async () => {
    await api.post('/auth/logout');
  },
};