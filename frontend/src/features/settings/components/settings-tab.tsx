'use client'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings2,Bell } from "lucide-react";
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore";

export default function SettingsTab(){
  const setSettingsTab = useWorkSpaceStore( state => state.setSettingsTab)
  const settings_tab = useWorkSpaceStore( state => state.settings_tab)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setSettingsTab('Emmanuel')} className={`${ settings_tab === "Emmanuel" ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
            <Avatar className="h-5 w-5 border border-border">
              <AvatarImage src="/#" alt=""/>
              <AvatarFallback className="text-sm font-medium">
                E
              </AvatarFallback>
              </Avatar>
              <span>Emmanuel</span>
          </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setSettingsTab('Preference')} className={`${settings_tab === 'Preference' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Settings2/>
                <span>Preference</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setSettingsTab('Notification')} className={`${settings_tab === 'Notification' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Bell/>
                <span>Notification</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
