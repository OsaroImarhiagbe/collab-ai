from backend.app.infrastructure.db.dependecies import get_db
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status
from app.modules.user.service.userService import UserService

get_database_dependency = Annotated[AsyncSession,Depends(get_db)]


def get_user_service(db: get_database_dependency) -> UserService :
    user_service = UserService(db)

    if not user_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Auth Service Database is unavilable"
        )
    
    return user_service