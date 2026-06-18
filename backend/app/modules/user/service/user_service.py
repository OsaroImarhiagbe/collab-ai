from typing import Dict, Any
from app.modules.user.schemas.user import User
from fastapi import HTTPException, status
from app.modules.user.infrastructure.user_dal.user_dal import UserRepositories
# To Do: Finish out user service logic

class UserService:
    """
    Service is for all user related operations
    """
    def __init__(self,repo:UserRepositories):
        self.__repo = repo

    async def get_user(self,current_user:Dict[str,Any]) -> User:
        user = await self._get_user_from_db(current_user)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail='User not found')
        
        return user

    