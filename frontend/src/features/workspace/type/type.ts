export type Priority = "HIGH" | "MEDIUM" | "LOW" | "URGENT";

export interface Member {
  id: string;
  initials: string;
  name: string;
  color: string;
}
export interface WorkSpace {
    workspace_name:string,
    open_createdialog:boolean,
    open_footer:boolean
    settings_tab:string
    openCreateTaskDialog:() => void
    updateWorkSpaceName: (title:string) => void
    openFooter:() => void
    setSettingsTab:(value:string) => void
}

