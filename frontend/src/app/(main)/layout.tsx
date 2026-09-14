'use client'
import { ReactNode, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Footer from "@/components/footer"
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { useGrabWorkSpace } from '@/features/workspace/hooks/useWorkSpace';
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore";


export default function MainLayout({children}:{children:ReactNode}){
    const user = useAuthStore((state) => state.user)
    const title = useWorkSpaceStore((state) => state.title)
    // const { data:workspace_data,isLoading } = useGrabWorkSpace(user?.user_id)
    // const router = useRouter()
    
    // useEffect(() => {
    //       const workspaces = workspace_data?.data ?? [];
    //       if (workspaces.length === 0) router.replace('/create-workspace');
          
    //       const lastWorkspaceId = localStorage.getItem('lastWorkspaceId');
    //       const lastWorkspace = workspaces.find((w) => w.workspace_id === lastWorkspaceId);
    //       console.log('work id',lastWorkspace)
    // },[router,workspace_data?.data])

    // if (isLoading) {
    //   return (
    //     <section className='min-h-dvh w-full flex-1 flex items-center justify-center'>
    //         <Badge variant="secondary">
    //         Loading Workspace
    //         <Spinner data-icon="inline-end" />
    //         </Badge>
    //     </section>
    //     );
    // }


    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-10"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Work Space
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
         {/* Each workspace screen renders here */}
       {children}
      </SidebarInset>
      <>
      <Footer/>
      </>
    </SidebarProvider>
    )
}