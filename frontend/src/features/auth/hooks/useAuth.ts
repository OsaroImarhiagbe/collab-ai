import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/features/api/type";
import type { AuthResponse } from "../types/type";
import axios from 'axios'

export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response: ApiResponse<AuthResponse> = await axios.post('fastapi-backend-ur;', {
                email,
                password,
            })

            return response
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async ({email,password, name}: {email:string, password:string,name:string}) => {
            const response:ApiResponse<AuthResponse> = await axios.post('fastaspi-backend-url',{
                email,
                password,
                name
            })

            return response
        }
    })
}
