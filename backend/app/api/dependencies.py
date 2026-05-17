from app.db.dependecies import get_db
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status
from backend.app.services import AuthService

get_database_dependency = Annotated[AsyncSession,Depends(get_db)]


def get_auth_service(db: get_database_dependency) -> AuthService :
    auth_service = AuthService(db)

    if not auth_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Auth Service Database is unaviable"
        )
    
    return auth_service
