import './App.css'
// import Login from './pages/auth/login'
// import Register from './pages/auth/register';
import BoardView from './pages/board';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      {/* <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/> */}
      {/* Private routes */}
       <Route path='/' element={<BoardView/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
