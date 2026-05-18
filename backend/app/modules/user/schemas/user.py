from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from enum import Enum

class Role(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

class UserRequest(BaseModel):
    user_id:str

class User(BaseModel):
    name:str

class UserCreate(BaseModel):
    password: str
    full_name: Optional[str] = None

class UserInDB(BaseModel):
    id: int
    hashed_password: str
    full_name: Optional[str] = None
    roles: List[str] = ["user"]

    class Config:
        orm_mode = True

class User(BaseModel):
    id: int
    name:str

    class Config:
        orm_mode = True