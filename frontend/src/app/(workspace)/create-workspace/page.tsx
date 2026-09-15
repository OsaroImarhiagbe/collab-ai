// pages/create-workspace.tsx
'use client'
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkSpace } from "@/features/workspace/hooks/useWorkSpace";
import DialogDemo from "@/components/loading-card";
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore";

export default function Page(){

  const { mutateAsync:create, isPending } = useCreateWorkSpace()
  const workspace_name = useWorkSpaceStore((state) => state.workspace_name)
  const updateWorkSpaceName = useWorkSpaceStore( (state) => state.updateWorkSpaceName)
  
  const handleCreateWorkSpace = useCallback(async () => { // function sending a post request to create a workspace
    await create({name:workspace_name})
  },[create,workspace_name])

  const loading_true = true

  return (
    <main className="min-h-dvh w-full flex items-center justify-center bg-white">
        <div className="flex flex-col">
            {/* header container */}
            <h1 className="text-black leading-tight tracking-tight">Create your first workspace</h1>
             <div className="flex flex-col items-center space-y-2">
            <Input
            className="text-center
            border-2"value={workspace_name}
            onChange={(e) => updateWorkSpaceName(e.target.value)}
            placeholder="Workspace name" />
            <Button onClick={handleCreateWorkSpace} className="hover:cursor-pointer">
                {isPending? <Spinner data-icon="inline-start" /> : null }
                {isPending? 'Creating....' : 'Create'}
            </Button>
            </div>
        </div>
        <>
        {loading_true &&  <DialogDemo/>}
       
        </>
    </main>
  );
}
