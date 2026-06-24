from uuid import UUID
from app.modules.task.infrastructure.task_dal.task_dal import TaskRepositories
class TaskService:
    """
    Task Service handles all relation task operation.
    """
    def __init__(self,repo:TaskRepositories):
        self.__repo = repo

    async def create_task_in_db(self,workspace_id:UUID,user_id:UUID,task_name:str):
        """
        function will handle creating the task if no task belongs in the databse
        """

        # step 1: Check if the task is already within the database

        task_results = await self.__repo.grab_task_from_db(task_name)

