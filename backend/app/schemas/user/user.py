from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List


class UserRequest(BaseModel):
    name:str
    email: EmailStr
    password:str

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
    full_name: Optional[str] = None
    roles: List[str] = ["user"]
    class Config:
        orm_mode = True