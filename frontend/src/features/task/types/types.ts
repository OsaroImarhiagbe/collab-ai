// types.ts
//
// Minimal shape assumed for CollabAI's task/board model. Adjust field names
// to match your real Task/Column types from the workspace feature module —
// this file exists so MyTasksView has something concrete to compile against.

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

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

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null; // ISO date
  assignee?: Assignee | null;
  workspaceId: string;
  commentCount?: number;
}

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string[];
}
export interface BoardHeaderProps {
  totalTasks: number;
  search: string;
  onSearchChange: (val: string) => void;
}
export interface BoardData {
  tasks: Record<string, Task>;
  columns: Column[];
}

export interface MyTasksViewProps {
  boardData: BoardData;
  currentUserId: string;
  onOpenTask: (taskId: string) => void;
  onAdvanceStatus: (taskId: string) => void;
}
export interface BoardColumnProps {
  column: Column;
  isDragOver: boolean;
  onDragStart: (taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: () => void;
}
// export interface Column {
//   id: string;
//   label: string;
//   color: string;
//   tasks: Task[];
// }