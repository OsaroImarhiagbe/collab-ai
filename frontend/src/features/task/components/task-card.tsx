import type { Task } from  "@/features/workspace/type/type";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  isDone: boolean;
  onDragStart: (taskId: string) => void;
}

const TAG_STYLES: Record<string, string> = {
  Bug:      "bg-rose-100 text-rose-700 border-rose-200",
  Feature:  "bg-amber-100 text-amber-700 border-amber-200",
  Design:   "bg-blue-100 text-blue-700 border-blue-200",
  Backend:  "bg-emerald-100 text-emerald-700 border-emerald-200",
  Research: "bg-slate-100 text-slate-600 border-slate-200",
};

const PRIORITY_ICON = {
  high:   <ArrowUp className="h-3 w-3 text-rose-500" />,
  medium: <Minus   className="h-3 w-3 text-amber-500" />,
  low:    <ArrowDown className="h-3 w-3 text-emerald-500" />,
};

export function TaskCard({ task, isDone, onDragStart }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      className={cn(
        "group rounded-lg border bg-white p-3 cursor-grab select-none",
        "transition-all duration-100 hover:-translate-y-px hover:shadow-sm",
        isDone && "opacity-60"
      )}
    >
      {/* Tag + Priority */}
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className={cn("text-[10px] font-medium px-2 py-0", TAG_STYLES[task.tag])}>
          {task.tag}
        </Badge>
        <span title={task.priority}>{PRIORITY_ICON[task.priority]}</span>
      </div>

      {/* Title */}
      <p className={cn(
        "text-xs font-medium leading-snug mb-3 text-foreground",
        isDone && "line-through text-muted-foreground"
      )}>
        {task.title}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {task?.assignees?.map((m) => (
            <Avatar key={m.id} className="h-5 w-5 text-[9px] border-2 border-white">
              <AvatarFallback className={cn("text-[9px]", m.color)}>
                {m.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className={cn(
          "flex items-center gap-1 text-[10px] text-muted-foreground",
          task.isOverdue && "text-rose-500"
        )}>
          <CalendarDays className="h-3 w-3" />
          {task.dueDate}
        </span>
      </div>
    </div>
  );
}