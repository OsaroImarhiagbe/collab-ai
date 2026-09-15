// stores/authStore.ts
import { create } from 'zustand';
import { WorkSpace } from '../type/type';



export const useWorkSpaceStore = create<WorkSpace>((set) => ({
    workspace_name: "Sprint 14",
    open_createdialog:false,
    openCreateTaskDialog: (value) => set({open_createdialog: value}),
    updateWorkSpaceName: (title) => set({ workspace_name: title }),
}));