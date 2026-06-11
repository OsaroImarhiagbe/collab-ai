import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth";
import { useTokenStore } from "@/api/store/useTokenStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
    const token_trigger = useTokenStore((state) => state.tokenTrigger)
    const user_trigger = useAuthStore((state) => state.setUser)
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async ({email,password}:{email:string,password:string}) => {
            const { login } = authService
            const response = await login(email,password)

            return response

        },
        onSuccess: (res) => {
            token_trigger(res.data.access_token)
            user_trigger(res.data.user)
            navigate('/')
        }
    })
}

export const useRegister = () => {
    const token_trigger = useTokenStore((state) => state.tokenTrigger)
    const user_trigger = useAuthStore((state) => state.setUser)
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async ({email,password, name}: {email:string, password:string,name:string}) => {
            const { register } = authService
            const response = await register(email,password,name)

            return response
        },
        onSuccess: (res) => {
            token_trigger(res.data.access_token)
            user_trigger(res.data.user)
            navigate('/')
        }
    })
}
