from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.user.infrastructure.models.user_profile import User_Profile


class UserRepositories:
    """
        User Serivce data layer    
    """

    def __int__(self,db:AsyncSession):
        self.__db = db
    
    async def _grab_user_by_id(self,current_user:dict[str,Any]):
        """
        Function purpose is to query the database for a user based of an id
        """
        results = await self.__db.execute(
            select(
                User_Profile.id,
                User_Profile.name,
            ).where(User_Profile.id == current_user["sub"])
        )
        
        user = results.first()

        return user