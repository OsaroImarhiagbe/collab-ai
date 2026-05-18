from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from app.services.dependencies import get_current_user
from backend.app.modules.user.service.dependencies import get_user_service
from backend.app.core.config import get_settings
from app.modules.user.schemas.user import UserRequest
from app.modules.user.service.userService import UserService

## To Do: Finish user logic connect to user service
# pydantic settings
settings = get_settings()

get_current_user_service_dependency = Annotated[str,Depends(get_current_user)]

get_user_service_dependency = Annotated[UserService,Depends(get_user_service)]

router = APIRouter(prefix=f"{settings.api_v1_str}/users",tags=["users"])

@router.get("/{user_id}",response_model=User)
async def get_user(user_id:str,current_user: get_current_user_service_dependency,service:get_user_service_dependency):
    """ Get Current user"""

  

    response = await service.get_user(user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    return user

@router.get("/", response_model=List[User])
async def read_users(
    current_user: str = Depends(get_current_user_with_roles(required_roles=["admin"]))
):
    """
    Get all users - only for admins
    """
    # Convert dict to list for response
    users = list(fake_users_db.values())
    return users