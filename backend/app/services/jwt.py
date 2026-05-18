from typing import List,Optional, Dict, Any
from datetime import timedelta, datetime,UTC
from backend.app.core.config import get_settings
from jose import jwt,JWTError


settings = get_settings()


def create_access_token(subject: str,email:str,role:str,is_active:bool,expires_delta: Optional[timedelta] = None) -> str:
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

def create_refresh_token(subject:str) -> str:
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
    

def decode_token(token:str) -> Dict[str,Any]:
    """ Decode JWT token to verify it"""

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except JWTError:
        return None