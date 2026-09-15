import { Task } from "@/features/task/types/types";

export interface Column {
  id: string;
  title: string;
  color?: string;
}
export interface BoardData {
  tasks: Task[];
  columns: Column[];
}

export interface BoardHeaderProps {
  totalTasks: number;
  search: string;
  header:string;
  onSearchChange: (val: string) => void;
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