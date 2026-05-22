import {  useMemo, useCallback, type PropsWithChildren, useState} from "react";
import type { AuthContextType,AuthUser} from "@/features/auth/types/type";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

export const AuthContextProvider = ({children}:PropsWithChildren) => {
    const navigate = useNavigate()
    const [ authenticated, setAuthenticated ] = useState<AuthUser>({
        user_id:'',
        authenticated:false
    })
   
    const { mutateAsync:loginAsync } = useLogin()
    const { mutateAsync:registerAsync } = useRegister()

    // //navigation hook
    


    


    const handleRegister = useCallback(async (name:string,email:string,password:string) => {
        await registerAsync({
            name:name,
            email:email,
            password:password
        })
    },[registerAsync])

    const handleLogin = useCallback(async (email:string,password:string) => {
        const repsonse = await loginAsync({
            email:email,
            password:password
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
        handleLogin,
        handleRegister,
    }),[
        authenticated,
        handleLogin,
        handleRegister,
    ])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}