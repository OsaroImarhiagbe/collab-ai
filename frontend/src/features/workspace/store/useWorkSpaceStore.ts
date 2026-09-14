// stores/authStore.ts
import { create } from 'zustand';


interface WorkSpace {
    title:string,
    updateTitle: (title:string) => void
}

export const useWorkSpaceStore = create<WorkSpace>((set) => ({
    title: "",
    updateTitle: (title) => set({ title: title }),
}));