import type { Metadata } from 'next'
import { AuthContextProvider } from '@/context/auth/authProvider.tsx'
import { QueryContextProvider } from '@/context/queryContext.tsx'
import { TooltipProvider } from "@/components/ui/tooltip"
import { WorkSpaceProvider } from '@/context/workspace/workspaceProvider.tsx'
import { UserProvider } from '@/context/user/userProvider.tsx'
import "@/app/globals.css"
import {  Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
         <TooltipProvider>
      <QueryContextProvider>
        <AuthContextProvider>
          <UserProvider>
          <WorkSpaceProvider>
            {children}
          </WorkSpaceProvider>
          </UserProvider>
    </AuthContextProvider>
    </QueryContextProvider>
    </TooltipProvider>
      </body>
    </html>
  );
}