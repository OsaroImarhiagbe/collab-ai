import { useContext, createContext } from "react";
import type { WorkSpaceContextType } from "@/features/workspace/type/type";

export const WorkSpaceContext = createContext<WorkSpaceContextType | undefined>(undefined)


export const useWorkSpace = () => {
    const ctx = useContext(WorkSpaceContext)
    
    if (!ctx){
        throw new Error('useWorkSpace must be under a context provider')
    }

    return ctx
}