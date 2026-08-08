
import { TaskCard } from "@/features/task/components/task-card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BoardColumnProps } from "@/features/workspace/type/type";


export default function BoardColumn({
  column,
  isDragOver,
  tasks,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: BoardColumnProps) {
 const isDone = true

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "flex flex-col w-[230px] shrink-0 rounded-xl border bg-muted/50 transition-colors",
        isDragOver && "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
      )}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b">
        <span className="h-2 w-2 rounded-full shrink-0"/>
        <span className="text-xs font-semibold flex-1">{column}</span>
        <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
          0
        </Badge>
        <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-2 p-2 flex-1">
        {tasks ? tasks?.map((task,idx) => (
          <TaskCard key={idx} task={task} isDone={isDone} onDragStart={onDragStart} />
        )) : <Button className="px-2 py-2 w-full text-sm" variant="outline">
          <Plus/> New Task
          </Button>}

        {isDragOver && (
          <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50/60 h-10 flex items-center justify-center text-[11px] text-blue-400 dark:bg-blue-950/30">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}