from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.workspaces.infrastructure.models.workspace import WorkSpaces
from app.modules.workspaces.infrastructure.models.workspace_members import WorkSpaceMembers
from app.modules.workspaces.schemas.workspace import Workspace_Roles
from sqlalchemy import select
from uuid import UUID

class WorkSpaceRepositories:
    def __init__(self,db:AsyncSession):
        self.__db = db
    

    async def grab_workspace_from_db(self,workspace_id:UUID):
        """
        Data Layer function to grab workspace by the name
        """
        results = await self.__db.execute(select(
            WorkSpaces.id,
        ).where(WorkSpaces.id == workspace_id))

        workspace = results.first()

        return workspace or None

    async def create_workspace_in_db(self,name:str,user_id:UUID):
        """
        Data Access Layer function, to create the workspace and set the creator of the workspace as owner
        """
        new_workspace = WorkSpaces(name=name,owner_id=user_id)
        
        self.__db.add(new_workspace)
        await self.__db.flush()

        new_workspace_members = WorkSpaceMembers(workspace_id=new_workspace.workspace_id,user_id=user_id)

        self.__db.add(new_workspace_members)
        self.__db.commit()

        if any(feild is None for feild in [new_workspace.workspace_id]):
            raise RuntimeError("workspace was inserted but one or more DB-generated fields were not returned")
        
        return new_workspace
    