from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum
from uuid import UUID

# User Authentication Role
class Role(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

# User Authentication Value
class Verified(Enum):
    authenticated = True
    not_authenticated = False

# Auth Request Object
class RefreshRequest(BaseModel):
    user_id:UUID

class LoginRequest(BaseModel):
    email: EmailStr
    password:str

class RegisterRequest(BaseModel):
    name:str
    email:str
    password:str


# Authentication Response Object
class UserAuthenticationData(BaseModel):
    user_id:UUID
    authenticated:str

class Token(BaseModel):
    access_token: str
    user:UserAuthenticationData
# Take a look at the resposne model going back to the client
class TokenResponse(BaseModel):
    status:int
    error:Optional[str] = None
    data: Token

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
    roles: List[str] = []

class TokenData(BaseModel):
    username: Optional[str] = None