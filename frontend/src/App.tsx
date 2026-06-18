import './App.css'
import Login from './pages/auth/login'
import Register from './pages/auth/register';
import WorkSpaceLayout from './pages/layout/workspacelayout';
import MyTasksView from './features/task/views/my-task-view';
import ProtectedRoute from './pages/protectedroutes';
import WorkspaceRedirect from './pages/workspace-redirect';
import CreateWorkspace from './pages/workspace/create-workspace';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/auth/authContext';

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route element={<ProtectedRoute isAuthenticated={user}/>}>
        {/* Resolves "which workspace" then redirects */}
        <Route path="/" element={<WorkspaceRedirect/>}/>
        <Route path="/create-workspace" element={<CreateWorkspace/>}/>

        <Route path="/workspace/:workspaceId" element={<WorkSpaceLayout/>}>
          <Route path='my-task' element={<MyTasksView/>}/>
          {/* <Route path="sprint/:sprintId" element={<Task/>} /> */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
