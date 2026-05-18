from datetime import timedelta
from typing import Any, Annotated
from fastapi import APIRouter,Depends, HTTPException, status, Response, Request
from jose import jwt, JWTError
from pydantic import ValidationError
from app.modules.auth.service.authService import AuthService
from backend.app.modules.auth.schemas.auth import Token
from app.core.config import get_settings
from app.modules.auth.service.dependencies import get_auth_service
from app.modules.auth.schemas.auth import LoginRequest, RegisterRequest, RefreshRequest
from app.middleware.jwt import create_access_token,create_refresh_token

settings = get_settings()

# To Do: Finish out refresh token endpoint and register user endpoint


get_auth_service_dependency = Annotated[AuthService, Depends(get_auth_service)]


router = APIRouter(prefix=f"{settings.API_V1_STR}/auth",tags=["auth"])

@router.post('/login',response_model=Token,tags=['auth'])
async def login_for_access_token(service: get_auth_service_dependency,request: LoginRequest,response:Response) -> Token:
   """
    OAuth2 compatible token login, returns an access token
    """
   try:
      # setting refresh token in httponly cookies
      results = await service.login_user(request)
      response.set_cookie(
         key="refresh_token",
         value=results.refresh_token,
         httponly=True, # Prevents client-side JS from accessing the cookie
         secure=True, # Set to True in production with HTTPS  # Recommended: Only send cookie over HTTPS
         samesite="lax", # Default browser behavior; restricts cross-site sending
         max_age=60 * 60 * 24 * settings.REFRESH_TOKEN_EXPIRE_DAYS  # in seconds

      )
      return results
   except LookupError as e:
      raise HTTPException(
         status_code=status.HTTP_404_NOT_FOUND,
         detail=str(e)
      )
   except ValueError as e:
      raise HTTPException(
         status_code=status.HTTP_400_BAD_REQUEST,
         detail=str(e),
      )
   except PermissionError as e:
      raise HTTPException(
         status_code=status.HTTP_403_FORBIDDEN,
         detail=str(e)
      )
   except RuntimeError as e:
      raise HTTPException(
         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
         detail=f"Internal server error"
      )



@router.post("/register",response_model=Token, tags=["auth"])
async def register_for_access_token(request:RegisterRequest,service:get_auth_service_dependency,response:Response) -> Token:
   """
   Create a user and generate a jwt token
   """
   try:
      results = await service.register_user(request)
      response.set_cookie(
         key="refresh_token",
         value=results.refresh_token,
         httponly=True,
         secure=True, # Set to True in production with HTTPS
         samesite="lax",
         max_age=60 * 60 * 24 * settings.REFRESH_TOKEN_EXPIRE_DAYS  # in seconds

      )
   except ValueError as e:
      raise HTTPException(
         status_code=status.HTTP_409_CONFLICT,
         detail=str(e)
      )
   except RuntimeError as e:
      raise HTTPException(
         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
         detail="Internal Server Erroi"
         )


@router.get('/refresh',response_model=Token,tags=['auth'])
async def refresh_token(refresh:RefreshRequest,request:Request,response:Response,current) -> Any:

   """ Refresh Token Endpoint"""

   try:
      # extract refresh token from httponly cookie
      refresh_token = request.cookies.get("refresh_token")

      if not refresh_token:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='No refresh token!'
            )
   
      
      
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
   

# @router.post('/logout', tags=['auth'])
# async def logout(response: Response):
#     response.delete_cookie(
#         key="refresh_token",
#         httponly=True,
#         secure=True,
#         samesite="lax"
#     )
#     return {"message": "Successfully logged out"}
   

