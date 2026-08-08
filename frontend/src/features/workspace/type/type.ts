export type Priority = "HIGH" | "MEDIUM" | "LOW" | "URGENT";

type Status = "TODO" | "IN_PROGRESS" | "DONE"

export type TaskTag = "Bug" | "Feature" | "Design" | "Backend" | "Research";

export interface Member {
  id: string;
  initials: string;
  name: string;
  color: string;
}
type Assignee = {
  id:string,
  fullName: string
}

export interface Task {
  
  id: string;
  title: string;
  tag?: TaskTag;
  status:Status
  priority: Priority;
  assignee: Assignee
  workspaceId:string
  assignees?: Member[];
  commentCount:number;
  dueDate: string;
  isOverdue?: boolean;
}

export interface Column {
  id: string;
  title: string;
  color?: string;
}

export type WorkSpace = {
  workspace_id:string
}

export interface WorkSpaceContextType {
  name:string,
  handleSetName:(value:string) => void
}
export interface BoardColumnProps {
  column: string;
  tasks:Task[]
  isDragOver: boolean;
  onDragStart: (taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: () => void;
}
export interface BoardData {
  tasks: Task[];
  columns: Column[];
}