
import type { BoardData } from "@/features/board/type/types";
import type { ReactNode } from "react";


// export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
// export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "done";
export type Priority = "HIGH" | "MEDIUM" | "LOW" | "URGENT";
type Status = "TODO" | "IN_PROGRESS" | "DONE"
export type TaskTag = "Bug" | "Feature" | "Design" | "Backend" | "Research";

export const priorityStyles: Record<TaskPriority, string> = {
  LOW: "bg-muted text-muted-foreground border-border",
  MEDIUM: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800",
  HIGH: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800",
  URGENT: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800",
};

export interface Assignee {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
}

// export interface Task {
//   id: string;
//   title: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate?: string | null; // ISO date
//   assignee?: Assignee | null;
//   workspaceId: string;
//   commentCount?: number;
// }



export interface MyTasksViewProps {
  boardData: BoardData;
  currentUserId: string;
  onOpenTask: (taskId: string) => void;
  onAdvanceStatus: (taskId: string) => void;
}



export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
}

export interface CreateTaskFormProps {
  onSubmit: (data: CreateTaskInput) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export interface CreateTaskDialogProps {
  onCreateTask?: (data: CreateTaskInput) => void | Promise<void>;
  trigger?: ReactNode;
}
export interface Member {
  id: string;
  initials: string;
  name: string;
  color: string;
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