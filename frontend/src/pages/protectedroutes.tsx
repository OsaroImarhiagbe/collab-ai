import { Navigate, Outlet } from 'react-router-dom';
import type { AuthUser } from '@/features/auth/types/type';
const ProtectedRoute = ({ isAuthenticated }:{isAuthenticated:AuthUser | null}) => {

  return !isAuthenticated ? <Outlet/> : <Navigate to="/login" replace={true}/> ;
};

export default ProtectedRoute;
