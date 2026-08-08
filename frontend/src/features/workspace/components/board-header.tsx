import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, SlidersHorizontal } from "lucide-react";
import { MEMBERS } from "@/features/workspace/data/data"
import { cn } from "@/lib/utils";

interface BoardHeaderProps {
  totalTasks: number;
  search: string;
  header:string;
  onSearchChange: (val: string) => void;
}

export default function BoardHeader({ totalTasks, search, header, onSearchChange }: BoardHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b bg-background flex-wrap">
      {/* Live indicator + title */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-sm font-semibold">{header}</span>
        <Badge variant="outline" className="text-[10px]">Board</Badge>
        <Badge variant="secondary" className="text-[10px] text-emerald-700 bg-emerald-100">
          {totalTasks} tasks
        </Badge>
      </div>

      <div className="flex-1" />

      {/* Collaborators */}
      <div className="flex -space-x-2">
        {MEMBERS.map((m) => (
          <Avatar key={m.id} className="h-6 w-6 border-2 border-background text-[9px]">
            <AvatarFallback className={cn("text-[9px]", m.color)}>{m.initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Search */}
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks…"
        className="h-7 w-36 text-xs"
      />

      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
        <SlidersHorizontal className="h-3 w-3" /> Filter
      </Button>

      <Button size="sm" className="h-7 text-xs gap-1.5">
        <Plus className="h-3 w-3" /> Add task
      </Button>
    </div>
  );
}