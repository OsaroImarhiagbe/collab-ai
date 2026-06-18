// useMyTasks.ts
//
// Thin wrapper around your existing board data, scoped to the current user.
// Intentionally does NOT duplicate filter/sort logic that already lives in
// useBoard.ts — it composes with it instead, the same way other workspace
// views derive from shared board state rather than forking it.
//
// Wire `useBoardData` to whatever you're already using to fetch/subscribe to
// board state for the active workspace (TanStack Query + WebSocket updates).

import { useMemo } from "react";
import type { BoardData, Task, TaskStatus } from "../types/types"

interface UseMyTasksParams {
  boardData: BoardData;
  currentUserId: string;
}

interface UseMyTasksResult {
  columns: { id: TaskStatus; title: string; tasks: Task[] }[];
  totalCount: number;
  overdueCount: number;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.status === "DONE") return false;
  return new Date(task.dueDate).getTime() < Date.now();
}

export function useMyTasks({ boardData, currentUserId }: UseMyTasksParams): UseMyTasksResult {
  return useMemo(() => {
    const myTasks = Object.values(boardData.tasks).filter(
      (task) => task.assignee?.id === currentUserId
    );

    const columns = boardData.columns.map((col) => ({
      id: col.id,
      title: STATUS_LABELS[col.id] ?? col.title,
      tasks: myTasks
        .filter((t) => t.status === col.id)
        .sort((a, b) => {
          // Overdue first, then by due date ascending, then undated last.
          const aOverdue = isOverdue(a);
          const bOverdue = isOverdue(b);
          if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }),
    }));

    return {
      columns,
      totalCount: myTasks.length,
      overdueCount: myTasks.filter(isOverdue).length,
    };
  }, [boardData, currentUserId]);
}

export { isOverdue };