from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.dependecies import get_db
from app.modules.workspaces.infrastructure.workspace_dal.workspace_dal import (
    WorkSpaceRepositories,
)
from app.modules.workspaces.service.workspace_service import WorkSpaceService

get_database_dependency = Annotated[AsyncSession,Depends(get_db)]


def get_workspace_service(db: get_database_dependency) -> WorkSpaceService :
    repo = WorkSpaceRepositories(db)
    workspace_service = WorkSpaceService(repo)
    return workspace_service
