import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './context/authContext.tsx'
import { QueryContextProvider } from './context/queryContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryContextProvider>
       <AuthContextProvider>
          <App />
    </AuthContextProvider>
    </QueryContextProvider>
  </StrictMode>,
)
