import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { useGrabWorkSpace } from '@/features/workspace/hooks/useWorkSpace';
import { useAuth } from '@/context/auth/authContext';
// pages/workspace-redirect.tsx
const WorkspaceRedirect = () => {
    const { user } = useAuth()
    const { data:workspace_data,isLoading } = useGrabWorkSpace(user?.user_id)
    
    if (isLoading) {
        return (
        <section className='min-h-dvh w-full flex-1 flex items-center justify-center'>
            <Badge variant="secondary">
            Loading Workspace
            <Spinner data-icon="inline-end" />
            </Badge>
        </section>
        );
    }
    const workspaces = workspace_data?.data ?? [];
    if (workspaces.length === 0) return <Navigate to="/create-workspace" replace />;
    
    const lastWorkspaceId = localStorage.getItem('lastWorkspaceId');
    const lastWorkspace = workspaces.find((w) => w.workspace_id === lastWorkspaceId);
    
    return <Navigate to={`/workspace/${lastWorkspace?.workspace_id}`} replace />;
}

export default WorkspaceRedirect;