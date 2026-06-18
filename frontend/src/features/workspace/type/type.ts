export type Priority = "high" | "medium" | "low";

export type TaskTag = "Bug" | "Feature" | "Design" | "Backend" | "Research";

export interface Member {
  id: string;
  initials: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  tag: TaskTag;
  priority: Priority;
  assignees: Member[];
  dueDate: string;
  isOverdue?: boolean;
}

export interface Column {
  id: string;
  label: string;
  color: string;
  tasks: Task[];
}

export type WorkSpace = {
  workspace_id:string
}