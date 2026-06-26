from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select,update
from app.modules.task.infrastructure.models.tasks import Tasks
from app.modules.task.schemas.task import TaskStatus, TaskUpdateRequest
from uuid import UUID

class TaskRepositories:
    """
    Task Service Data Layer
    """
    def __init__(self,db:AsyncSession):
        self.__db = db
    
    async def grab_task_from_db(self,workspace_id:UUID):
        """
        Grab a task from the database by the task name
        """
        results = await self.__db.execute(select(Tasks.id,Tasks.title).where(Tasks.workspace_id == workspace_id))

        tasks = results.all()

        return tasks or None
    
    async def insert_task_in_db(self,workspace_id:UUID,user_id:UUID,task_name:str):

        """
        Insert the new task into the database
        """
        
        new_task = Tasks(title=task_name,workspace_id=workspace_id,created_by=user_id)

        self.__db.add(new_task)
        await self.__db.commit()
        await self.__db.refresh(new_task)

        if any(feild is None for feild in [new_task.id]):
            raise RuntimeError("Task was inserted but one or more DB-generated fields were not returned")
        
        return new_task
    
    async def update_task_in_db(self,task_id:UUID,request:TaskUpdateRequest):
        new_status:str

        if request.status == TaskStatus.ACTIVE.value:
            new_status = TaskStatus.ACTIVE.value
        elif request.status == TaskStatus.COMPLETED.value:
            new_status = TaskStatus.COMPLETED.value

        await self.__db.execute(update(Tasks).where(Tasks.task_id == task_id, Tasks.status == TaskStatus.UNACTIVE.value).values(status = new_status))
        await self.__db.commit()