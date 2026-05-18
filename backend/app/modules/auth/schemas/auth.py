from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum

class Role(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

class AuthRequest(BaseModel):
    name:str
    email: EmailStr
    password:str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
    roles: List[str] = []

class TokenData(BaseModel):
    username: Optional[str] = None