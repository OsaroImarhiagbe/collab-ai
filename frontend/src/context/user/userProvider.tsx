import { useMemo, type PropsWithChildren, useState, useCallback } from "react"
import { UserContext } from "./userContext"
import type { UserContextType } from "@/features/user/type/types";


export const UserProvider = ({children}:PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab ] = useState('')

    const handleSetOpen = useCallback(() => setOpen(prev => !prev),[])
    const handleSetActiveTab = useCallback((value:string) => setActiveTab(value),[])
    

    const value = useMemo<UserContextType>(() => ({
        open,
        activeTab,
        handleSetOpen,
        handleSetActiveTab
    }),[open,
        activeTab,
        handleSetOpen,
        handleSetActiveTab
    ])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}