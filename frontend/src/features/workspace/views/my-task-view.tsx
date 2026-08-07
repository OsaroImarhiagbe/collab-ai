
import BoardHeader from "@/features/task/components/board-header"
import BoardColumn  from "@/features/task/components/border-column"
import { useState, useRef } from "react"
import type { BoardData } from "../../task/types/types"
const currentUserId = 'u_1'
const mockBoardData:BoardData = {
    columns: [
      { id: "TODO", title: "To do", taskIds: ["t1", "t2", "t4"] },
      { id: "IN_PROGRESS", title: "In progress", taskIds: ["t3"] },
      { id: "DONE", title: "Done", taskIds: ["t5"] },
    ],
    tasks: {
      t1: {
        id: "t1",
        title: "Wire up Alembic migration for workspace roles",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        commentCount: 2,
      },
      t2: {
        id: "t2",
        title: "Draft npm package risk scoring heuristic",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
      },
      t3: {
        id: "t3",
        title: "Add Redis token blacklist test coverage",
        status: "IN_PROGRESS",
        priority: "URGENT",
        dueDate: new Date().toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        commentCount: 5,
      },
      t4: {
        id: "t4",
        title: "Not assigned to current user",
        status: "TODO",
        priority: "LOW",
        assignee: { id: "u_2", fullName: "Someone Else" },
        workspaceId: "w_1",
      },
      t5: {
        id: "t5",
        title: "Set up RLS policy for authenticated role",
        status: "DONE",
        priority: "HIGH",
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
      },
    },
  };

const MyTasksView = () => {
  const [search, setSearch] = useState("");
  // const totalTasks = mockBoardData.tasks.reduce((sum, c) => sum + c.tasks.length, 0);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);

  const dragTaskId = useRef<string | null>(null);
  const dragFromColId = useRef<string | null>(null);
  function onDragStart(taskId: string) {
    dragTaskId.current = taskId;
    dragFromColId.current =  mockBoardData.columns.find((c) => c.id === taskId)?.id ?? null;
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
  }



  return (
    <section className="flex flex-col min-h-dvh w-full py-10 px-10">
      <BoardHeader
        totalTasks={0}
        search={search}
        onSearchChange={setSearch}
      />
      <div className="flex gap-3 p-4 overflow-x-auto flex-1 items-start">
        {mockBoardData.columns.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            isDragOver={dragOverColId === col.id}
            onDragStart={onDragStart}
            onDragOver={(e) => onDragOver(e, col.id)}
            onDragLeave={onDragLeave}
            onDrop={() => onDrop(col.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default MyTasksView;