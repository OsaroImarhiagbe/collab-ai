from datetime import timedelta
from typing import Any, Annotated
from fastapi import APIRouter,Depends, HTTPException, status
from jose import jwt, JWTError
from pydantic import ValidationError
from app.modules.auth.service.authService import AuthService
from backend.app.modules.auth.schemas.auth import Token
from app.core.config import get_settings
from app.modules.auth.service.dependencies import get_auth_service
from app.modules.auth.schemas.auth import AuthRequest

settings = get_settings()

# To Do: Finish out refresh token endpoint and register user endpoint


get_auth_service_dependency = Annotated[AuthService, Depends(get_auth_service)]


router = APIRouter(prefix=f"{settings.API_V1_STR}/auth",tags=["auth"])

@router.post('/login',response_model=Token,tags=['auth'])
async def login_for_access_token(service: get_auth_service_dependency,request: AuthRequest) -> Token:
   """
    OAuth2 compatible token login, returns an access token
    """
   response = await service.login_user(request)

   return response



@router.post("/register")
async def register_for_access_token():
   """
   Create a user and generate a jwt token
   """
   pass

@router.get('/refresh',response_model=Token,tags=['auth'])
async def refresh_token(refresh_token:str) -> Any:

   """ Refresh Token Endpoint"""

   try:
      if "token_type" not in payload or payload["token_type"] != 'refresh_token':
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Invlaid refresh token',
            headers={"WWW-Authenticate":"Bearer"})
      
      email = payload.get('sub')

      if email is None:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail='Could not validate credientials',
            headers={"WWW-Authenticate":"Bearer"})
      
      user = fake_users_db.get(email)

      if user is None:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found", 
            headers={"WWW-Authenticate":"Bearer"})
      
      if not user['is_active']:
         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='Inactive user')
      
      access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

      access_token = create_access_token(subject=email,roles=user['roles'], expires_delta=access_token_expires)

      new_refresh_token = refresh_token(subject=email)
      return {
         "access_token":access_token,
         "refresh_token":new_refresh_token,
         "token_type":"bearer"
      }
   except (JWTError, ValidationError):
      raise HTTPException(
         status_code=status.HTTP_403_FORBIDDEN,
         detail='Could not validate credentials',
         headers={"WWW-Authenticate": "Bearer"})
   
   except Exception as e:
      print(f'Error at Login endpoint: {e}') ## Could add logging here
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Interal server error')
   

