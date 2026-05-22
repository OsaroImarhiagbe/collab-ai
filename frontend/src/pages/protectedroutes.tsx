import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }:{isAuthenticated:boolean | undefined}) => {

  return !isAuthenticated ? <Navigate to="/login" replace={true}/> : <Outlet/>;
};

export default ProtectedRoute;
