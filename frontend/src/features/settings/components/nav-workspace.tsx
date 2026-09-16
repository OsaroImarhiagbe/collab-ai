'use client'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings,Users } from "lucide-react"
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore"

export default function NavWorkSpace(){
  const setSettingsTab = useWorkSpaceStore( state => state.setSettingsTab)
  const settings_tab = useWorkSpaceStore( state => state.settings_tab)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Work Space</SidebarGroupLabel>
      <SidebarMenu>
       <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setSettingsTab('General')} className={`${settings_tab === 'General' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Settings/>
                <span>General</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setSettingsTab('People')} className={`${settings_tab === 'People' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Users/>
                <span>People</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}