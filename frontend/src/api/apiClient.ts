import axios from "axios"

import type { ApiResponse } from "./types/type";
import { useTokenStore } from "@/api/store/useTokenStore";
const apiClient = axios.create({
    baseURL:import.meta.env.VITE_FAST_API_URL,
    timeout:10_000,
    withCredentials:true // sends your httpOnly refresh token cookie automatically
})


// Request interceptor — attaches the access token to every outgoing request
apiClient.interceptors.request.use((config) => {
  const access_token = useTokenStore((state) => state.token)
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

// Response interceptor — handles 401s by refreshing and retrying once
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // Your refresh endpoint — the cookie goes automatically via withCredentials
        const { data } = await axios.post('/auth/refresh', {}, { withCredentials: true });
        const access_token = useTokenStore((state) => state.tokenTrigger)
        access_token(data.access_token)
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(original); // retry the original request
      } catch {
        const access_token_clear = useTokenStore((state) => state.tokenClear)
        access_token_clear()
        window.location.href = '/login'; // or dispatch a logout event
      }
    }

    return Promise.reject(error);
  }
);

// Typed helper methods — these unwrap ApiResponse<T> for you
export const api = {
  get: <T>(url: string, config?: Parameters<typeof apiClient.get>[1]) =>
    apiClient.get<ApiResponse<T>>(url, config).then((r) => r.data),

  post: <T>(url: string, body?: unknown, config?: Parameters<typeof apiClient.post>[2]) =>
    apiClient.post<ApiResponse<T>>(url, body, config).then((r) => r.data),

  patch: <T>(url: string, body?: unknown) =>
    apiClient.patch<ApiResponse<T>>(url, body).then((r) => r.data),

  delete: <T>(url: string) =>
    apiClient.delete<ApiResponse<T>>(url).then((r) => r.data),
};
