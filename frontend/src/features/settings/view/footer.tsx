import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@/context/user/userContext";
import { SidebarProvider, SidebarInset} from "@/features/settings/components/sidebar"
import { AppSidebar } from "@/features/settings/components/settings-sidebar"
import Profile from "@/features/user/view/profile";
import PreferencesPage from "@/features/settings/view/preference";
import NotificationsPage from "@/features/notifications/view/notification";
import WorkspaceSettingsPage from "./workspace-settings";
import PeoplePage from "./people";
const Footer = () => {
  const { open,activeTab, handleSetOpen } = useUser()


  const renderContent = () => {
    switch (activeTab) {
      case "Emmanuel":
        return <Profile/>;
      case "Preference":
        return <PreferencesPage/>;
      case "Notification":
        return <NotificationsPage/>;
      case "General":
        return <WorkspaceSettingsPage/>
      case "People":
        return <PeoplePage/>
      default:
        return <Profile/>

    }
  };
 

  return (
      <Dialog open={open} onOpenChange={handleSetOpen}>
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


export default Footer;