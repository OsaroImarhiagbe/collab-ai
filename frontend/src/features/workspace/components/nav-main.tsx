import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarMenu>
        <Button variant="secondary">Emmanuel</Button>
        <Button variant="secondary">Preference</Button>
        <Button variant="secondary">Nofitication</Button>
      </SidebarMenu>
    </SidebarGroup>
  )
}
