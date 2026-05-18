from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum
from uuid import UUID
class Role(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

class Verified(Enum):
    verified = True
    not_verified = False

class RefreshRequest(BaseModel):
    user_id:UUID

class LoginRequest(BaseModel):
    email: EmailStr
    password:str


class RegisterRequest(BaseModel):
    name:str
    email:str
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