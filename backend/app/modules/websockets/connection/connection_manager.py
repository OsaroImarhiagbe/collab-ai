from fastapi import WebSocket
from collections import defaultdict
from uuid import UUID

class ConnectionManager:
    """
    Connection Manager handles the connection for our websockets
    """
    def __init__(self):
         # { workspace_id: { user_id: WebSocket } }
        self._active_connections: dict[str, dict[str,WebSocket]] = defaultdict(dict)
    
    async def connect(self,workspace_id:UUID,user_id:UUID,websocket:WebSocket):
        await websocket.accept()
        self._active_connections[workspace_id][user_id] = websocket
        print(f"User {user_id} has connected to workspace {workspace_id}")
    
    def disconnect(self,workspace_id:UUID,user_id:UUID,websocket:WebSocket):
        workspace = self._active_connections.get(workspace_id)
        if workspace:
            workspace.pop(user_id,None)
            # Clean up empty workspace bucket
            if not workspace:
                del self._active_connections[workspace_id]
        print(f"User {user_id} has disconnected from workspace {workspace_id}")

        # self.active_connections.remove(websocket)
    
    # async def send_personal_message(self, message: str, websocket: WebSocket):
    #     await websocket.send_text(message)
    
    # async def braodcast(self,message: str): 
    #     for connection in self.active_connections:
    #         await connection.send_text(message)
    
    async def broadcast(self, workspace_id:UUID, message: dict) -> None:
        """Fan out a message to all connections in a workspace."""
        workspace = self._active_connections.get(workspace_id, {})
        stale: list[UUID] = []
 
        for user_id, websocket in workspace.items():
            try:
                await websocket.send_text(message) # might be send_json but lets try send_text
            except Exception:
                print(f"Failed to send to user {user_id}, marking stale")
                # logger.warning(f"Failed to send to user {user_id}, marking stale")
                stale.append(user_id)
 
        for user_id in stale:
            self.disconnect(workspace_id, user_id)
    
    async def send_to_user(self, workspace_id: str, user_id: str, message: dict) -> None:
        """Targeted delivery to a single user within a workspace."""
        workspace = self._connections.get(workspace_id, {})
        websocket = workspace.get(user_id)
 
        if not websocket:
            print(f"No active connection for user {user_id} in workspace {workspace_id}")
            # logger.warning(f"No active connection for user {user_id} in workspace {workspace_id}")
            return
 
        try:
            await websocket.send_json(message)
        except Exception:
            print(f"Failed to send to user {user_id}, unregistering")
            # logger.warning(f"Failed to send to user {user_id}, unregistering")
            self.unregister(workspace_id, user_id)