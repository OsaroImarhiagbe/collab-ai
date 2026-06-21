import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './context/auth/authProvider.tsx'
import { QueryContextProvider } from './context/queryContext.tsx'
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter } from 'react-router-dom'
import { WorkSpaceProvider } from './context/workspace/workspaceProvider.tsx'
import { UserProvider } from './context/user/userProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
     <TooltipProvider>
      <QueryContextProvider>
        <AuthContextProvider>
          <UserProvider>
          <WorkSpaceProvider>
            
                <App />
          </WorkSpaceProvider>
          </UserProvider>
    </AuthContextProvider>
    </QueryContextProvider>
    </TooltipProvider>
     </BrowserRouter>
  </StrictMode>,
)
