import { useMemo, type PropsWithChildren, useState, useCallback } from "react"
import { UserContext } from "./userContext"
import type { UserContextType } from "@/features/user/type/types";


export const UserProvider = ({children}:PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const handleSetOpen = useCallback(() => setOpen(prev => !prev),[])

    

    const value = useMemo<UserContextType>(() => ({
        open,
        handleSetOpen 
    }),[open,
        handleSetOpen 
    ])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}