from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.user.schemas.user import User
from sqlalchemy import select
from app.modules.models import User_Profile
from fastapi import HTTPException, status

# To Do: Finish out user service logic

class UserService:
    """
    Service is for all user related operations
    """
    def __init__(self,db: AsyncSession):
        self.db = db

    async def get_user(self,current_user:Dict[str,Any]) -> User:
        user = await self.get_user_from_db(current_user)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail='User not found')
        
        return user
    
    # async def get_all_users_from_db():
    #     pass

    async def get_user_from_db(self,current_user:Dict[str,Any]):
        """
        Function purpose is to query the database for a user based of an id
        """
        if not current_user["sub"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized access: can not access content"
            )
        
        results = await self.db.execute(
            select(
                User_Profile.id,
                User_Profile.name,
            ).where(User_Profile.id == current_user["sub"])
        )
        
        if not results:
            print('Error user not found userService')
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = results.first()

        return user
    