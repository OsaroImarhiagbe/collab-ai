import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@/context/user/userContext"
import { Settings,Users } from "lucide-react"
const NavWorkSpace = () => {
  const { activeTab, handleSetActiveTab } = useUser()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Work Space</SidebarGroupLabel>
      <SidebarMenu>
       <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleSetActiveTab('General')} className={`${activeTab === 'General' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Settings/>
                <span>General</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleSetActiveTab('People')} className={`${activeTab === 'People' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Users/>
                <span>People</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavWorkSpace;