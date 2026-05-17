from typing import List,Optional, Dict, Any
from datetime import timedelta, datetime,UTC
from backend.app.core.config import get_settings
from jose import jwt,JWTError
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import Token, UserRequest,Role, TokenPayload
from sqlalchemy import select
from app.models import User
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
settings = get_settings()



class AuthService:
    """ Serivce handles the authentication and autherization within the backend application"""
    

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.api_v1_str}/auth/login")

    def __init__(self, db: AsyncSession, pwd_context=CryptContext(schemes=["bcrypt"])):
        self.pwd_context = pwd_context
        self.db = db

    
    async def login_user(self,request: UserRequest) -> Token:
        
        ## Look into what would happened if query based of email( like if email has an index)
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
        
        ## if we have a user and user is a current active user (ex. not deleted account we will issue new access_token upon login)
        if user and user.is_active:
            access_token_expires = timedelta(minutes=settings.access_token_expire_minutes) #ex. 15 minutes

            access_token = self.create_access_token(
                subject=user.id,
                email=user.email,
                role=Role.USER,
                is_active=user.is_active,
                expires_delta=access_token_expires
            )

            refresh_token = self.create_refresh_token(subject=user.id) # id coming from database

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            }

    def create_access_token(self,subject: str,email:str,role:str,is_active:bool,expires_delta: Optional[timedelta] = None) -> str:
        """ Creates JWT Access Token"""

        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=settings.access_token_expire_minutes)

        to_encode = {
            "sub":str(subject),
            "email":email,
            "is_active":is_active,
            "role":role,
            "exp":expire,
            "iat":datetime.now(UTC), # I think this is UTC
            "token_type":"JWT"
        }

        ## Creating and Signing access token
        encode_jwt = jwt.encode(
            to_encode,
            settings.secret_key, 
            algorithm=settings.algorithm)

        return encode_jwt
    
    def create_refresh_token(self,subject:str) -> str:
        """ Create JWT refresh token"""

        expire = datetime.now() + timedelta(days=settings.refresh_token_expire_days)

        to_encode = {
            "sub":str(subject),
            "exp":expire,
            "iat":datetime.now(),
            "token_type":'refresh'
        }

        encode_jwt = jwt.encode(
            to_encode, 
            settings.secret_key, 
            algorithm=settings.algorithm)

        return encode_jwt


    ## this function will be our token validation function
    async def get_current_user(self,token:str) -> str:
        """ Validate tokens and return username"""

        try:
   
            payload = self.decode_token(token)
            token_data = TokenPayload(**payload)

            # Check for token expiration
            if datetime.fromtimestamp(token_data.exp) < datetime.now():
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Token Expired',headers={"WWW-Authenticate": "Bearer"})
            
            return token_data.sub
        except (JWTError, ValidationError):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    def get_current_user_with_roles(required_roles:Optional[List[str]] = None) -> callable:
        """
        Creates a dependency that checks if the current user has the required roles
        """
        if required_roles is None:
            required_roles = []
        
        def _inner(token: str = Depends(oauth2_scheme)) -> str:
            try:
                payload = decode_token(token)
                token_data = TokenPayload(**payload)
                # Check token expiration
                if datetime.fromtimestamp(token_data.exp) < datetime.now():
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Token expired",
                        headers={"WWW-Authenticate": "Bearer"},
                    )
                # If no specific roles required, just authentication is enough
                if not required_roles:
                    return token_data.sub
                # Check if user has at least one of the required roles
                user_roles = set(token_data.roles)
                if not any(role in user_roles for role in required_roles) and "admin" not in user_roles:
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="Insufficient permissions",
                        headers={"WWW-Authenticate": "Bearer"},
                    )
                return token_data.sub
            except (JWTError, ValidationError):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Could not validate credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        return _inner
        
    def decode_token(self,token:str) -> Dict[str,Any]:
        """ Decode JWT token to verify it"""

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

        return payload
    
    def _verify_password(self,plain_password:str, hash_password:str) -> bool:
        """ Verifying plain password against hashed password"""
        return self.pwd_context.verify(plain_password, hash_password)
    

    def get_password(self,password:str) -> str:
        return self.pwd_context.hash(password)