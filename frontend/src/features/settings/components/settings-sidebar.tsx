import * as React from "react"

import NavAccount from "./nav-account"
import NavWorkSpace from "./nav-workspace"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
// import {
//   LayoutDashboardIcon,
//   KanbanIcon,
//   ListTodoIcon,
//   CalendarDaysIcon,
//   UsersIcon,
//   Settings2Icon,
//   FolderKanbanIcon,
//   RocketIcon,
//   BriefcaseIcon,
// } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavAccount/>
        <NavWorkSpace/>
      </SidebarContent>
    </Sidebar>
  )
}
