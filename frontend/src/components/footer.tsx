'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SidebarProvider, SidebarInset} from "@/features/settings/components/sidebar"
import { AppSidebar } from "@/features/settings/components/settings-sidebar"
import UserSection from "@/features/user/components/user-section";
import SettingsSection from "@/features/settings/components/settings-section";
import NotificationsSection from "@/features/notifications/component/notifications-section";
import WorkspaceSettingsSection from "@/features/workspace/components/workspace-settings-section";
import TeamSection from "@/features/team/component/team-section";
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore";


export default function Footer(){

  const open_footer = useWorkSpaceStore( state => state.open_footer)
  const openFooter = useWorkSpaceStore(state => state.openFooter)
  const settings_tab = useWorkSpaceStore( state => state.settings_tab)

  const renderContent = () => {
    switch (settings_tab) {
      case "Emmanuel":
        return <UserSection/>;
      case "Preference":
        return <SettingsSection/>;
      case "Notification":
        return <NotificationsSection/>;
      case "General":
        return <WorkspaceSettingsSection/>
      case "People":
        return <TeamSection/>
      default:
        return <UserSection/>

    }
  };
 

  return (
      <Dialog open={open_footer} onOpenChange={openFooter}>
      <DialogContent className="h-[800px] overflow-hidden p-0 sm:max-w-[95vw] md:max-w-7xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile, login information, and devices.
          </DialogDescription>
        </DialogHeader>
        <SidebarProvider>
         <AppSidebar collapsible="none"/>
        <SidebarInset>
          <section className="px-7 overflow-y-auto h-[800px]">
           {renderContent()}
          </section>
        </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
