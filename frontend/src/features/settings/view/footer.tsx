import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@/context/user/userContext";
import { SidebarProvider, SidebarInset} from "@/features/workspace/components/sidebar"
import { AppSidebar } from "@/features/workspace/components/app-sidebar"
// import Profile from "@/features/user/view/profile";
// import PreferencesPage from "@/features/settings/view/preference";
import NotificationsPage from "@/features/notifications/view/notification";
const Footer = () => {
  const { open, handleSetOpen } = useUser()


  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "appearance":
  //       return <AppearanceSection />;
  //     case "language":
  //       return <LanguageSection />;
  //     case "datetime":
  //       return <DateTimeSection />;
  //     case "privacy":
  //       return <PrivacySection />;
  //     case "accessibility":
  //       return <AccessibilitySection />;
  //   }
  // };
 

  return (
      <Dialog open={open} onOpenChange={handleSetOpen}>
      <DialogContent className="h-[800px] overflow-hidden p-0 sm:max-w-[95vw] md:max-w-7xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile, login information, and devices.
          </DialogDescription>
        </DialogHeader>
        <SidebarProvider className="h-[300px] items-start">
         <AppSidebar collapsible="none" className="hidden md:flex" />
        <SidebarInset>
            <NotificationsPage/>
        </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}


export default Footer;