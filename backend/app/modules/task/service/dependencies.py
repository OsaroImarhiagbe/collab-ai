from app.infrastructure.db.dependecies import get_db
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends 
from app.modules.task.infrastructure.task_dal.task_dal import TaskRepositories
from app.modules.task.service.task_service import TaskService

get_database_dependency = Annotated[AsyncSession,Depends(get_db)]


def get_task_service(db: get_database_dependency) -> TaskService:
    """
    Dependency function to initalize task service DAL layer 
    """
    repo = TaskRepositories(db)
    task_service = TaskService(repo)
    return task_service
