from pydantic import BaseModel
from uuid import UUID



class TaskReqest(BaseModel):
    workspace_id:UUID
    user_id:UUID
    task_name:str