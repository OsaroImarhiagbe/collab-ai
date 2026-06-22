import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { settings_columns } from "../data/data";
const NavAccount = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
          {settings_columns.map((item) => (
            <SidebarMenuItem key={item.id}>
                <SidebarMenuButton tooltip={item.title}>
                  <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavAccount;