from datetime import timedelta
from app.core.config import get_settings
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.auth.schemas.auth import LoginRequest, TokenResponse, Role, RegisterRequest, Token, UserAuthenticationData
from sqlalchemy import select
from app.modules.models import Auth_Credentials
from fastapi import HTTPException, status
from app.middleware.jwt import create_access_token, create_refresh_token
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

settings = get_settings()



class AuthService:
    """ Serivce handles the authentication and autherization within the backend application"""
    
    def __init__(self, db: AsyncSession, pwd_context=CryptContext(schemes=["bcrypt"])):
        self.pwd_context = pwd_context
        self.db = db

    
    async def login_user(self,request: LoginRequest) -> TokenResponse:
        """
        Service Layer function to check user credentials against the database
        """
        # we should probably sanitize the email input before we check the database
        if not request.email:
            raise ValueError("Incorrect email")

        # Query database for email and password
        user  = await self._verify_user_from_db(email=request.email)


        # verify password
        if not self._verify_password(request.password, user.hashed_password):
            raise ValueError("Incorrect email or password")
        
        if not user.is_verifed:
            raise PermissionError("Account is not verifed")
        
        ## if we have a user and user is a current active user (ex. not deleted account we will issue new access_token upon login)
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes) #ex. 15 minutes

        # Signing and Createing access token
        access_token = create_access_token(
            subject=user.id,
            role=user.role,
            is_authenticated=user.is_authenticated,
            expires_delta=access_token_expires
        )
        # Creating refresh token
        refresh_token = create_refresh_token(subject=user.id) # id coming from database

        return TokenResponse(
            status=status.HTTP_200_OK,
            error="",
            data=Token(
                access_token=access_token,
                refresh_token=refresh_token,
                user= UserAuthenticationData(
                    user_id=user.user_id,
                    authenticated=user.is_authenticated
                )
            )
            )
    
    async def register_user(self,request:RegisterRequest) -> TokenResponse:
        """
        Service layer for user registration
        """
        # check to see email and name are valid strings type

        if not request.email or not request.name:
            raise ValueError("Invalid email or name")
        
        hashed_password = self._get_password(request.password)

        user = await self.insert_user_into_db(request.email,hashed_password)

    
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes) #ex. 15 minutes

        # Signing and Createing access token
        access_token = create_access_token(
            subject=user.user_id,
            role=user.role,
            is_verified=user.is_authenticated,
            expires_delta=access_token_expires
        )
        # Creating refresh token
        refresh_token = create_refresh_token(subject=user.id) # id coming from database

        return TokenResponse(
            status=status.HTTP_200_OK,
            error="",
            data=Token(
                access_token=access_token,
                refresh_token=refresh_token,
                user= UserAuthenticationData(
                    user_id=user.user_id,
                    authenticated=user.is_authenticated
                )
            )
            )
    

    async def insert_user_into_db(self, email: str, hashed_password: str):
        """
        Data Layer

        Function used to insert data into user_profiles table upon user creation.
        Raises:
            ValueError: if the email already exists
            RuntimeError: if a database or unexpected error occurs
        """
        try:
            # check if email already exisit in db before adding it to db
            new_user = Auth_Credentials(email=email, hashed_password=hashed_password)
            await self.db.add(new_user)
            await self.db.commit()
            await self.db.refresh(new_user)


            # guard check all db-generated fields at once
            if any(field is None for field in [new_user.user_id, new_user.created_at, new_user.updated_at,new_user.role, new_user.is_verified]):
                raise RuntimeError("User was inserted but one or more DB-generated fields were not returned")
                        
            return new_user
        

        except IntegrityError as e:
            await self.db.rollback()
            print(f"Duplicate email attempted: {email} | {e}")
            raise ValueError(f"A user with email '{email}' already exists.") from e

        except SQLAlchemyError as e:
            await self.db.rollback()
            print(f"Database error during user creation: {e}")
            raise RuntimeError("Failed to insert user due to a database error.") from e

        except Exception as e:
            await self.db.rollback()
            print(f"Unexpected error during user creation: {e}")
            raise RuntimeError("An unexpected error occurred during user creation.") from e


    async def _verify_user_from_db(self,email:str):
        """ 
        Data Layer
        function will check auth_credentials table for user"""

        ## Look into what would happened if query based of email( like if email has an index)
        response = await self.db.execute(select(
             Auth_Credentials.id,
             Auth_Credentials.email,
             Auth_Credentials.hashed_password,
             Auth_Credentials.is_authenticated,
             Auth_Credentials.role
             )
             .where(Auth_Credentials.email == email))
        
     
        user = response.scalar_one_or_none()

        if user is None:
            raise LookupError(f"User with email '{email}' not found")

        return user

    def _verify_password(self,plain_password:str, hash_password:str) -> bool:
        """ Verifying plain password against hashed password"""
        return self.pwd_context.verify(plain_password, hash_password)
    

    def _get_password(self,password:str) -> str:
        return self.pwd_context.hash(password)