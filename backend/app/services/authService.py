from typing import List,Optional, Dict, Any
from datetime import timedelta, datetime
from backend.app.core.config import get_settings
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import Token, UserRequest
from sqlalchemy import select
from app.models.user.user import User
from fastapi import HTTPException, status
settings = get_settings()

class AuthService:
    """ Serivce handles the authentication and autherization within the backend application"""

    def __init__(self, db: AsyncSession, pwd_context=CryptContext(schemes=["bcrypt"])):
        self.pwd_context = pwd_context
        self.db = db

    
    async def login_user(self,request: UserRequest) -> Token:
        
        result  = await self.db.execute(select(User.id,User.email,User.hased_password, User.is_active).where(User.email == request.email))

        user = result.scalar_one_or_none()

        if not user or not self._verify_password(request.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Incorrect email or password',
                headers={"WWW-Authenticate":"Bearer"})
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail='Inactive user')
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

        access_token = self.create_access_token(
                subject=user["email"],
                roles=user["roles"],
                expires_delta=access_token_expires
            )
        
        refresh_token = self.create_refresh_token(subject=user["email"])

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

    def create_access_token(self,subject: str, roles: List[str], expires_delta: Optional[timedelta] = None) -> str:
        """ Creates JWT Access Token"""

        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode = {
            "sub":str(subject),
            "exp":expire,
            "iat":datetime.now(), # I think this is UTC
            "roles":roles
        }

        encode_jwt = jwt.encode(to_encode,settings.SECRET_KEY, algorithm=settings.ALGORITHM)

        return encode_jwt
    
    def create_refresh_token(self,subject:str) -> str:
        """ Create JWT refresh token"""

        expire = datetime.now() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        to_encode = {
            "sub":str(subject),
            "exp":expire,
            "iat":datetime.now(),
            "token_type":'refresh'
        }

        encode_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

        return encode_jwt
    
    def decode_token(self,token:str) -> Dict[str,Any]:
        """ Decode JWT token"""

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

        return payload
    
    def _verify_password(self,plain_password:str, hash_password:str) -> bool:
        """ Verifying plain password against hashed password"""
        return self.pwd_context.verify(plain_password, hash_password)
    

    def get_password(self,password:str) -> str:
        return self.pwd_context.hash(password)