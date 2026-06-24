from sqlalchemy.ext.asyncio import AsyncSession



class TaskRepositories:
    """
    Task Service Data Layer
    """
    def __init__(self,db:AsyncSession):
        self.__db = db
    
    async def grab_task_from_db(task_name:str):
        pass