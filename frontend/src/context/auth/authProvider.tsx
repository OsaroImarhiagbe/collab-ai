import {  useMemo, type PropsWithChildren } from "react";
import type { AuthContextType  } from "@/features/auth/types/type";

import { AuthContext } from "./authContext";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const AuthContextProvider = ({children}:PropsWithChildren) => {
    
 
    const user = useAuthStore((state) => state.user)

    const value = useMemo<AuthContextType>(() => ({
        user
    }),[user])

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}