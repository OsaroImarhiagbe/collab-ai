from datetime import timedelta
from app.core.config import get_settings

from sqlalchemy.ext.asyncio import AsyncSession

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

    async def get_user(self,user_id:str):
        results = await self.get_user_from_db(user_id)

    async def get_user_from_db(self,user_id:str):
        
        results = await self.db.execute(
            select(
                User_Profile.id,
                User_Profile.name,
            ).where(User_Profile.id == user_id)
        )
        
        if not results:
            print('Error user not found userService')
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = results.first()

        return user