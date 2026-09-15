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
    openCreateTaskDialog:(value:boolean) => void
    updateWorkSpaceName: (title:string) => void
}

