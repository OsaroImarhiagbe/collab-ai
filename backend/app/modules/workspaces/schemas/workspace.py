from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum
from uuid import UUID


class Workspace_Roles(Enum):
    ADMIN = 'admin' # -> can edit workspace settings, manage members, delete tasks
    MEMBER = 'memeber' # -> can create and upate tasks, change status
    GUEST ='guest' # -> read-only, can view tasks and comments

class WorkSpaceRequest(BaseModel):
    name:str