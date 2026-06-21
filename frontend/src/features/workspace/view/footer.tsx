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
import Profile from "@/features/user/view/profile";

const Footer = () => {
  const { open, handleSetOpen } = useUser()

 

  return (
      <Dialog open={open} onOpenChange={handleSetOpen}>
      <DialogContent className="h-[900px] overflow-hidden p-0 sm:max-w-[95vw] lg:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile, login information, and devices.
          </DialogDescription>
        </DialogHeader>
        <SidebarProvider className="h-[300px] items-start">
         <AppSidebar collapsible="none" className="hidden md:flex" />
        <SidebarInset>
          <div className="flex-1 overflow-y-auto p-6">
            <Profile />
          </div>
        </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}


export default Footer;