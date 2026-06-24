from app.infrastructure.db.dependecies import get_db
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from app.modules.auth.service.auth_service import AuthService
from app.modules.auth.infrastructure.auth_dal.auth_dal import AuthRepositories

get_database_dependency = Annotated[AsyncSession,Depends(get_db)]


def get_auth_service(db: get_database_dependency) -> AuthService :
    repo = AuthRepositories(db)
    auth_service = AuthService(repo)
    return auth_service
