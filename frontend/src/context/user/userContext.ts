'use client'
import { createContext, useContext } from "react";
import type { UserContextType } from "@/features/user/type/types";
export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx){
        throw new Error('useUser must be used under a context provider')
    }
    return ctx
}