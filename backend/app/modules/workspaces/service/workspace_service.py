from app.modules.workspaces.infrastructure.workspace_dal.workspace_dal import WorkSpaceRepositories
from uuid import UUID
from app.modules.workspaces.schemas.workspace import WorkSpaceResponse,WorkSpace
from fastapi import status


class WorkSpaceService:
    def __init__(self,repo:WorkSpaceRepositories):
        self.__repo = repo

    async def create_workspace(self,workspace_name:str,workspace_owner_id:UUID) -> WorkSpaceResponse:
        """
        function will handle create the workspace
        """

        # step 1: Create the workspace
        workspace_results = await self.__repo.create_workspace_in_db(workspace_name,workspace_owner_id)

        # step 2: return workspace id
        return WorkSpaceResponse(
            status=status.HTTP_200_OK,
            error='',
            data=WorkSpace(
                workspace_id=workspace_results.workspace_id
            )
        )
    
    async def workspace_exists(self,workspace_id:UUID):
        """
        helper Function checks is the workspace with the workspace_id exists
        """
        results = await self.__repo.grab_workspace_from_db(workspace_id)

        return results 