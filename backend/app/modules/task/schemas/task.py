from pydantic import BaseModel
from uuid import UUID
from enum import Enum
from typing import Optional


class TaskStatus(Enum):
    ACTIVE = 'active' # task has started to be worked on
    COMPLETED = 'completed' # task is completed end to end
    UNACTIVE = 'unactive' # task was first assigned or created not yet started


class Task(BaseModel):
    task_id:UUID
    status:TaskStatus

class TaskResponse(BaseModel):
    status:int
    error:Optional[str] = None
    data: Task

class TaskUpdateResponse(BaseModel):
    status:int
    error:Optional[str] = None
class TaskUpdateRequest(BaseModel):
    assignee_id:Optional[UUID] = None
    status:Optional[TaskStatus] = None

class TaskReqest(BaseModel):
    user_id:UUID
    task_name:str