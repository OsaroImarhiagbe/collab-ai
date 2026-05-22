import { useState, useRef } from "react";
import type { Column } from "@/features/workspace/type/type"
import { INITIAL_COLUMNS } from "@/features/workspace/data/data"

export function useBoard() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [search, setSearch] = useState("");
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);

  const dragTaskId = useRef<string | null>(null);
  const dragFromColId = useRef<string | null>(null);

  function onDragStart(taskId: string) {
    dragTaskId.current = taskId;
    dragFromColId.current =
      columns.find((c) => c.tasks.some((t) => t.id === taskId))?.id ?? null;
  }

  function onDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault();
    setDragOverColId(colId);
  }

  function onDragLeave() {
    setDragOverColId(null);
  }

  function onDrop(colId: string) {
    setDragOverColId(null);
    const tid = dragTaskId.current;
    const fromId = dragFromColId.current;
    if (!tid || fromId === colId) return;

    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, tasks: [...c.tasks] }));
      const from = next.find((c) => c.id === fromId)!;
      const to = next.find((c) => c.id === colId)!;
      const idx = from.tasks.findIndex((t) => t.id === tid);
      if (idx === -1) return prev;
      const [task] = from.tasks.splice(idx, 1);
      to.tasks.push(task);
      return next;
    });
  }

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((t) =>
      !search || t.title.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const totalTasks = columns.reduce((sum, c) => sum + c.tasks.length, 0);

  return {
    columns: filteredColumns,
    totalTasks,
    search,
    setSearch,
    dragOverColId,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}