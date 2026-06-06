import './App.css'
import Login from './pages/auth/login'
import Register from './pages/auth/register';
import WorkSpaceLayout from './pages/layout/workspacelayout';
import Task from './pages/task/task';
import ProtectedRoute from './pages/protectedroutes';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/auth/authContext';
function App() {

  const { user} = useAuth()

  console.log('Auth:',user)


  return (
   
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>


      {/* Wrap protected routes */}
    <Route element={<ProtectedRoute isAuthenticated={user}/>}>
      <Route path="/" element={<WorkSpaceLayout/>}>
      {/* 1. Default screen when visiting /dashboard */}
      <Route index element={<Task/>} />

        {/* 2. Other sub-screens */}
      </Route>
    </Route>
    </Routes>
  )
}

export default App
