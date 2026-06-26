from uuid import UUID
from app.modules.task.infrastructure.task_dal.task_dal import TaskRepositories
from app.modules.task.schemas.task import TaskResponse,Task, TaskUpdateRequest, TaskUpdateResponse
from fastapi import status
from app.modules.workspaces.service.workspace_service import WorkSpaceService
from sqlalchemy.exc import IntegrityError
class TaskService:
    """
    Task Service handles all relation task operation.
    """
    def __init__(self,repo:TaskRepositories,service:WorkSpaceService):
        self.__repo = repo
        self.__workspace_service = service

    async def create_task_in_db(self,workspace_id:UUID,user_id:UUID,task_name:str) -> TaskResponse:
        """
        function will handle creating the task if no task belongs in the databse
        """
        
        # step 1: check if the workspace exists
        workspace_exists = await self.__workspace_service.workspace_exists(workspace_id)

        if workspace_exists is None:
            raise LookupError(f"The workspace: {workspace_id} does not exists")
        
        # step 2: if the workspace exists, create the task
        task_results = await self.__repo.insert_task_in_db(workspace_id,user_id,task_name)

        return TaskResponse(
            status=status.HTTP_200_OK,
            error="",
            data=Task(
                task_id=task_results.task_id,
                status=task_results.status
            )
        )
    async def get_all_task_in_worksppace(self,workspace_id:UUID) -> TaskResponse:
        # step 1: Query the database to get all the task within the workspace
        task_results = await self.__repo.grab_task_from_db(workspace_id)

        # step 2: if task_results is None throw, lookupError
        if task_results is None:
            raise LookupError(f"There are no task within workspace id: {workspace_id} ")

        return task_results
    
    async def update_task_information(self,task_id:UUID,request:TaskUpdateRequest) -> TaskUpdateResponse:
        """
        Function will handle updating the task information.
        
        """

        # step 1: update task information
        await self.__repo.update_task_in_db(task_id,request)

        # TO DO: look at custom error being return, figure out how companies return customer errors vs generic errors
        return TaskUpdateResponse(
            status=status.HTTP_201_CREATED,
            error=""
        )
