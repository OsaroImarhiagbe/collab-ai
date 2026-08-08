// import { useBoard } from "@/features/workspace/hooks/useBoard"
// import { BoardHeader } from "@/features/workspace/components/board-header"
// import { BoardColumn } from "@/features/workspace/components/border-column"

// export function BoardView() {
//   const {
//     columns,
//     totalTasks,
//     search,
//     setSearch,
//     dragOverColId,
//     onDragStart,
//     onDragOver,
//     onDragLeave,
//     onDrop,
//   } = useBoard()

//   return (
//     <div className="flex flex-col h-full">
//       <BoardHeader
//         totalTasks={totalTasks}
//         search={search}
//         onSearchChange={setSearch}
//       />
//       <div className="flex gap-3 p-4 overflow-x-auto flex-1 items-start">
//         {columns.map((col) => (
//           <BoardColumn
//             key={col.id}
//             column={col}
//             isDragOver={dragOverColId === col.id}
//             onDragStart={onDragStart}
//             onDragOver={(e) => onDragOver(e, col.id)}
//             onDragLeave={onDragLeave}
//             onDrop={() => onDrop(col.id)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }