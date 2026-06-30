from app.modules.websockets.connection.connection_manager import ConnectionManager
from uuid import UUID
class WebSocketService:
    def __int__(self,connection_manager: ConnectionManager):
        self.__manager = connection_manager
    
    # --- Connection lifecycle (called by the WS router) ---
    async def register(self,workspace_id:UUID,user_id:UUID) -> None:
        """
        function calls the connection manager to register websocket connection.
        """
        await self.__manager.connect(workspace_id,user_id)
    
    async def unregister(self,workspace_id:UUID,user_id:UUID) -> None:
        """
        function calles the connection manger to disconnect websocket connection.
        """
        await self.__manager.disconnect(workspace_id,user_id)