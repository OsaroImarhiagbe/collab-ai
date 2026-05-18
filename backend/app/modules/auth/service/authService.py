from datetime import timedelta
from backend.app.core.config import get_settings
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.auth.schemas.auth import AuthRequest, Token, Role
from sqlalchemy import select
from app.modules.models import Auth_Credentials
from fastapi import HTTPException, status
from app.services.jwt import create_access_token, create_refresh_token

settings = get_settings()



class AuthService:
    """ Serivce handles the authentication and autherization within the backend application"""
    
    def __init__(self, db: AsyncSession, pwd_context=CryptContext(schemes=["bcrypt"])):
        self.pwd_context = pwd_context
        self.db = db

    
    async def login_user(self,request: AuthRequest) -> Token:
        
        # Query database for email and password
        user  = await self.verify_user_from_db(email=request.email)


        # verify password
        if not self._verify_password(request.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Incorrect email or password',
                headers={"WWW-Authenticate":"Bearer"}
            )
        
        if not user.is_verifed:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail='Inactive user')
        
        ## if we have a user and user is a current active user (ex. not deleted account we will issue new access_token upon login)
        if user and user.is_active:
            access_token_expires = timedelta(minutes=settings.access_token_expire_minutes) #ex. 15 minutes

            # Signing and Createing access token
            access_token = create_access_token(
                subject=user.id,
                email=user.email,
                role=Role.USER,
                is_active=user.is_active,
                expires_delta=access_token_expires
            )
            # Creating refresh token
            refresh_token = create_refresh_token(subject=user.id) # id coming from database

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            } 
    async def verify_user_from_db(self,email:str):
        """ function will check auth_credentials table for user"""

        ## Look into what would happened if query based of email( like if email has an index)
        response = await self.db.execute(select(
             Auth_Credentials.id,
             Auth_Credentials.email,
             Auth_Credentials.hashed_password,
             Auth_Credentials.is_verified)
             .where(Auth_Credentials.email == email))
        
        if not response:
            print('user not found authService')
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = response.scalar_one_or_none()

        return user

    def _verify_password(self,plain_password:str, hash_password:str) -> bool:
        """ Verifying plain password against hashed password"""
        return self.pwd_context.verify(plain_password, hash_password)
    

    def get_password(self,password:str) -> str:
        return self.pwd_context.hash(password)