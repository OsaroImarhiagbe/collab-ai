import {  createContext, useContext, useMemo, useCallback, type PropsWithChildren } from "react";
import type { AuthContextType } from "@/features/auth/types/type";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be under auth context provider')
    return ctx
}

export const AuthContextProvider = ({children}:PropsWithChildren) => {
   
    const { mutateAsync:loginAsync } = useLogin()
    const { mutateAsync:registerAsync } = useRegister()

    


    const handleRegister = useCallback(async (name:string,email:string,password:string) => {
        await registerAsync({
            name:name,
            email:email,
            password:password
        })
    },[registerAsync])

    const handleLogin = useCallback(async (email:string,password:string) => {
        await loginAsync({
            email:email,
            password:password
        })
    },[loginAsync])

    const value = useMemo<AuthContextType>(() => ({
        handleLogin,
        handleRegister,
    }),[
        handleLogin,
        handleRegister,
    ])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}