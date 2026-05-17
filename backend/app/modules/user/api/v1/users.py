from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
# from app.auth.jwt_bearer import get_current_user, get_current_user_with_roles
from backend.app.modules.auth.service.dependencies import get_auth_service
from backend.app.core.config import get_settings
from app.schemas import User
from backend.app.services import AuthService


# pydantic settings
settings = get_settings()
# For demonstratio
fake_users_db = {
    "john@example.com": {
        "id": 1,
        "email": "john@example.com",
        "full_name": "John Doe",
        "roles": ["user"],
        "is_active": True
    },
    "admin@example.com": {
        "id": 2,
        "email": "admin@example.com",
        "full_name": "Admin User",
        "roles": ["user", "admin"],
        "is_active": True
    }
}
get_auth_service_dependency = Annotated[AuthService,Depends(get_auth_service)]

router = APIRouter(prefix=f"{settings.api_v1_str}/users",tags=["users"])

@router.get("/me",response_model=User)
async def get_user(auth_service: get_auth_service_dependency,token:str = Depends(AuthService.oauth2_scheme)):
    """ Get Current user"""

    # user = fake_users_db.get(current_user)

    response = await service.get_current_user(token)

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