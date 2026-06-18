import { api } from "@/api/apiClient"
import type { WorkSpace } from "../type/type"

export const WorkSpaceService = {
    create_workspace: async (name:string) => {
        const response = await api.post<WorkSpace>('/workspace',{name})
        return response.data
    }
}