from typing import Annotated

from fastapi import APIRouter, Depends

from app.middleware.dependencies import get_current_user
from app.modules.user.schemas.user import User
from app.modules.user.service.dependencies import get_user_service
from app.modules.user.service.user_service import UserService

## To Do: Finish user logic connect to user service
# pydantic settings


get_current_user_dependency = Annotated[dict,Depends(get_current_user)]

get_user_service_dependency = Annotated[UserService,Depends(get_user_service)]

router = APIRouter(tags=["users"])

@router.get("/me",response_model=User)
async def get_user(current_user: get_current_user_dependency,service:get_user_service_dependency) -> User:
    """ Get Current user"""

    return await service.get_user(current_user)


# @router.get("/", response_model=List[User])
# async def read_users(
#     current_user: str = Depends(get_current_user_with_roles(required_roles=["admin"]))
# ):
#     """
#     Get all users - only for admins
#     """
#     # Convert dict to list for response
#     users = list(fake_users_db.values())
#     return users