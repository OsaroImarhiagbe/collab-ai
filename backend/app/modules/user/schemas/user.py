from enum import Enum

from pydantic import BaseModel


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
    full_name: str | None = None

class UserInDB(BaseModel):
    id: int
    hashed_password: str
    full_name: str | None = None
    roles: list[str] = ["user"]

    # class Config:
    #     orm_mode = True

class User1(BaseModel):
    id: int
    name:str

    # class Config:
    #     orm_mode = True