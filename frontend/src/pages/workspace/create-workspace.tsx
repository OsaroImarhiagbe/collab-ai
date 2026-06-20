// pages/create-workspace.tsx
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkSpace } from "@/features/workspace/hooks/useWorkSpace";
import { useWorkSpace } from "@/context/workspace/workspaceContext";
const CreateWorkspace = ()  => {
  const { mutateAsync:create, isPending } = useCreateWorkSpace()
  
  const { name, handleSetName } = useWorkSpace()
  
  const handleCreate = useCallback(async () => {
    await create({name:name})
    
  },[create,name])

  return (
    <main className="min-h-dvh w-full flex items-center justify-center">
        <div className="flex flex-col">
            {/* header container */}
            <h1 className="text-black leading-tight tracking-tight">Create your first workspace</h1>
             <div className="flex flex-col items-center space-y-2">
            <Input
            className="text-center
            border-2"value={name}
            onChange={(e) => handleSetName(e.target.value)}
            placeholder="Workspace name" />
            <Button onClick={handleCreate}>
                {isPending? <Spinner data-icon="inline-start" /> : null }
                {isPending? 'Creating....' : 'Create'}
            </Button>
            </div>
        </div>
    </main>
  );
}

export default CreateWorkspace