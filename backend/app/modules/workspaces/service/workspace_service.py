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

        ## Step 1 : Check to see if we already have the workspace created
        workspace_exists = await self.workspace_exists(workspace_id) # need to look at this function

        # Step 2: if workspace is already made raise LookupError
        if workspace_exists:
            raise ValueError('Work space already exists!')
        
        # Step 3: if workspace does not exists we create it
        workspace_results = await self.__repo.create_workspace_in_db(workspace_name,workspace_owner_id)

        return WorkSpaceResponse(
            status=status.HTTP_200_OK,
            error='',
            data=WorkSpace(
                workspace_id=workspace_results.id
            )
        )
    
    async def workspace_exists(self,workspace_id:UUID):
        """
        helper Function checks is the workspace with the workspace_id exists
        """
        results = await self.__repo.grab_workspace_from_db(workspace_id)

        return results 