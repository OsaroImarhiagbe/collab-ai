import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
// pages/workspace-redirect.tsx
const WorkspaceRedirect = () => {
  const [status, setStatus] = useState<'loading' | 'has-workspace' | 'no-workspace'>('no-workspace');
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    async function resolve() {
      const res = await fetch('/api/workspaces'); // list workspaces user belongs to
      const data = await res.json();

      if (data.length === 0) {
        setStatus('no-workspace');
        return;
      }

      const lastId = localStorage.getItem('lastWorkspaceId');
      const stillValid = data.find((w: any) => w.id === lastId);
      setWorkspaceId(stillValid ? lastId : data[0].id);
      setStatus('has-workspace');
    }
    resolve();
  }, []);

   if (status === 'loading') return <section className='min-h-dvh w-full flex-1 flex items-center justify-center'><Badge variant="secondary">
        Loding Workspace
        <Spinner data-icon="inline-end" />
      </Badge></section>; // or a spinner component
  if (status === 'no-workspace') return <Navigate to="/create-workspace" replace />;
  return <Navigate to={`/workspace/${workspaceId}/my-task`} replace />;
}

export default WorkspaceRedirect;