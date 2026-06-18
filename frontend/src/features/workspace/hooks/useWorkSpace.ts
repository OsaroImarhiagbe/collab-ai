import { useMutation } from "@tanstack/react-query";
import { WorkSpaceService } from "../api/workspace";
import { useNavigate } from "react-router-dom";

export const useCreateWorkSpace = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async ({name}:{name:string}) => {
            const { create_workspace } = WorkSpaceService;

            const reponse = await create_workspace(name)
            return reponse
        },
        onSuccess: (res) => {
            localStorage.setItem('lastWorkspaceId', res.data.workspace_id);
            navigate(`/workspace/${res.data.workspace_id}`, { replace: true });
        },
        onError: (error) => {
            console.error(error)
        }
    })
}