import {useCallback, useMemo, useState, type PropsWithChildren } from "react";
import type { WorkSpaceContextType } from "@/features/workspace/type/type";
import { WorkSpaceContext } from "./workspaceContext";




export const WorkSpaceProvider = ({children}:PropsWithChildren) => {
    const [name, setName] = useState<string>('');

    const handleSetName = useCallback((value:string) => setName(value),[])

    const value = useMemo<WorkSpaceContextType>(() => ({
        name,
        handleSetName
    }),[name,handleSetName])
    return <WorkSpaceContext.Provider value={value}>{children}</WorkSpaceContext.Provider>
}

export default WorkSpaceProvider