import {  useMemo, useCallback, type PropsWithChildren, useState} from "react";
import type { AuthContextType,AuthUser, LoginSchema, RegisterSchema} from "@/features/auth/types/type";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

import { registerSchema,loginSchema } from "@/features/auth/types/type";
export const AuthContextProvider = ({children}:PropsWithChildren) => {
    const navigate = useNavigate()
    const [ authenticated, setAuthenticated ] = useState<AuthUser>({
        user_id:'',
        authenticated:false
    })
   
    const { mutateAsync:loginAsync, isPending:loginPending } = useLogin()
    const { mutateAsync:registerAsync, isPending:registerPending } = useRegister()

    
    


    


    const handleRegister = useCallback(async (registerForm:RegisterSchema) => {

        const result = registerSchema.safeParse(registerForm);
        if (!result.success) {
            console.log(result.error.message);
            return
        }

        await registerAsync({
            name:registerForm.name,
            email:registerForm.email,
            password:registerForm.password
        })
    },[registerAsync])

    const handleLogin = useCallback(async (loginForm:LoginSchema) => {
        const result = loginSchema.safeParse(loginForm)
        if (!result.success) {
            console.log(result.error.message);
            return
        }
        const repsonse = await loginAsync({
            email:loginForm.email,
            password:loginForm.password
        })

        if(repsonse.status === 200 ){
            setAuthenticated({
                user_id:repsonse?.data.user.user_id,
                authenticated:repsonse?.data.user.authenticated
            })
            navigate('/')
        }
    },[loginAsync,navigate])

    const value = useMemo<AuthContextType>(() => ({
        authenticated,
        loginPending,
        registerPending,
        handleLogin,
        handleRegister,
    }),[
        authenticated,
        loginPending,
        registerPending,
        handleLogin,
        handleRegister,
    ])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}