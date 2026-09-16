// stores/authStore.ts
import { create } from 'zustand';
import { WorkSpace } from '../type/type';



export const useWorkSpaceStore = create<WorkSpace>((set) => ({
    workspace_name: "Sprint 14",
    open_createdialog:false,
    open_footer:false,
    settings_tab:"",
    openCreateTaskDialog:() => set((prev) => ({open_createdialog: !prev.open_createdialog}) ),
    updateWorkSpaceName: (title) => set({ workspace_name: title }),
    openFooter:() => set((prev) => ({open_footer: !prev.open_footer})),
    setSettingsTab:(value) => set({settings_tab: value})
}));