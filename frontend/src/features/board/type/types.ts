export interface BoardHeaderProps {
  totalTasks: number;
  search: string;
  header:string;
  onSearchChange: (val: string) => void;
}