from uuid import UUID
from app.modules.task.infrastructure.task_dal.task_dal import TaskRepositories
from app.modules.task.schemas.task import TaskResponse,Task
from fastapi import status
class TaskService:
    """
    Task Service handles all relation task operation.
    """
    def __init__(self,repo:TaskRepositories):
        self.__repo = repo

    async def create_task_in_db(self,workspace_id:UUID,user_id:UUID,task_name:str) -> TaskResponse:
        """
        function will handle creating the task if no task belongs in the databse
        """

        # step 1: Check if the task is already within the database
        task_exists = await self.__repo.grab_task_from_db(task_name)

        if task_exists:
            raise LookupError(f"Task:{task_exists[0]} already exists in the database")
        
        # step 2: if the task doesn't exists, create the task
        task_results = await self.__repo.create_task_in_db(workspace_id,user_id,task_name)

        return TaskResponse(
            status=status.HTTP_200_OK,
            error="",
            data=Task(
                task_id=task_results.id,
                status=task_results.status
            )
        )
    
    async def update_task_status(self):
        """
        Function will handle updating the task status.
        
        """
        pass

    async def updated_task_assingee(self):
        """
        Function will handle updating who the task is assgined to.
        """
        pass
