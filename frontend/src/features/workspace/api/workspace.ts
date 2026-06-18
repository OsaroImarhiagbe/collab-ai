import { api } from "@/api/apiClient"
import type { WorkSpace } from "../type/type"

export const WorkSpaceService = {
    create_workspace: async (name:string) => {
        const response = await api.post<WorkSpace>('/workspace/create',{name})
        return response.data
    },
    locate_workspace: async () => {
        const response = await api.get<WorkSpace[]>('/workspace')
        return response.data
    }
}