from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class TaskStatus(Enum):
    ACTIVE = 'active' # task has started to be worked on
    COMPLETED = 'completed' # task is completed end to end
    UNACTIVE = 'unactive' # task was first assigned or created not yet started


class Task(BaseModel):
    task_id:UUID
    status:TaskStatus

class TaskResponse(BaseModel):
    status:int
    error:str | None = None
    data: Task

class TaskUpdateResponse(BaseModel):
    status:int
    error:str | None = None
class TaskUpdateRequest(BaseModel):
    assignee_id:UUID | None = None
    status:TaskStatus | None = None

class TaskReqest(BaseModel):
    user_id:UUID
    task_name:str