import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/user/userContext";
import { Settings2,Bell } from "lucide-react";
const NavAccount = () => {
  const { activeTab, handleSetActiveTab } = useUser()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => handleSetActiveTab('Emmanuel')} className={`${ activeTab === "Emmanuel" ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
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
              <SidebarMenuButton onClick={() => handleSetActiveTab('Preference')} className={`${activeTab === 'Preference' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Settings2/>
                <span>Preference</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleSetActiveTab('Notification')} className={`${activeTab === 'Notification' ? "bg-gray-300 hover:bg-gray-300" : ""} cursor-pointer`}>
                <Bell/>
                <span>Notification</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavAccount;