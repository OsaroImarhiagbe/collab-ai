'use client'
import BoardHeader from "@/features/board/components/board-header"
import BoardColumn  from "@/features/board/components/border-column"
import { useState, useRef, } from "react"
import type { BoardData } from "@/features/board/type/types"
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore"
import CreateTaskDialog from "@/features/task/components/createtaskdialog"
const currentUserId = 'u_1'
const mockBoardData:BoardData = {
    columns: [
      { id: "TODO", title: "To do", },
      { id: "IN_PROGRESS", title: "In progress"},
      { id: "REVIEW",title:"Review"},
      { id: "DONE", title: "Done", },
    ],
    tasks:[
      {
        id: "t1",
        title: "Wire up Alembic migration for workspace roles",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        commentCount: 2,
      },
      {
        id: "t2",
        title: "Draft npm package risk scoring heuristic",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        commentCount: 2,
      },
       {
        id: "t3",
        title: "Add Redis token blacklist test coverage",
        status: "IN_PROGRESS",
        priority: "URGENT",
        dueDate: new Date().toISOString(),
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        commentCount: 5,
      },
       {
        id: "t4",
        title: "Not assigned to current user",
        status: "TODO",
        priority: "LOW",
        dueDate: new Date().toISOString(),
        assignee: { id: "u_2", fullName: "Someone Else" },
        workspaceId: "w_1",
        commentCount: 2,
      },
      {
        id: "t5",
        title: "Set up RLS policy for authenticated role",
        status: "DONE",
        priority: "HIGH",
        assignee: { id: currentUserId, fullName: "Emmanuel Rivera" },
        workspaceId: "w_1",
        dueDate: new Date().toISOString(),
        commentCount: 5,
      },],
  };

export default function Page(){
  const [search, setSearch] = useState("");
  // const totalTasks = mockBoardData.tasks.reduce((sum, c) => sum + c.tasks.length, 0);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);
  const dragTaskId = useRef<string | null>(null);
  const dragFromColId = useRef<string | null>(null);
  const workspace_name = useWorkSpaceStore((state) => state.workspace_name);


  // function onDragStart(taskId: string) {
  //   dragTaskId.current = taskId;
  //   dragFromColId.current =  mockBoardData.columns.find((c) => c.id === taskId)?.id ?? null;
  // }

  // function onDragOver(e: React.DragEvent, colId: string) {
  //   e.preventDefault();
  //   setDragOverColId(colId);
  // }

  // function onDragLeave() {
  //   setDragOverColId(null);
  // }

  // function onDrop(colId: string) {
  //   setDragOverColId(null);
  //   const tid = dragTaskId.current;
  //   const fromId = dragFromColId.current;
  //   if (!tid || fromId === colId) return;
  // }



  return (
    <section className="min-h-dvh w-full">
      <BoardHeader
        totalTasks={0}
        search={search}
        header={workspace_name}
        onSearchChange={setSearch}
      />
      <div className="md:flex items-center flex-row gap-20 p-4 overflow-x-auto">
        {mockBoardData.columns.map((col) => (
          <BoardColumn
            key={col.id}
            column={col.title}
            tasks={mockBoardData.tasks}
          />
        ))}
      </div>
      <CreateTaskDialog/>
    </section>
  )
}