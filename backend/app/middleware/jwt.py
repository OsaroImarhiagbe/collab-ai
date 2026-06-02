from typing import Optional, Dict, Any
from datetime import timedelta, datetime,UTC
from app.core.config import settings
from jose import jwt,JWTError
from uuid import uuid4


def create_access_token(subject: str,role:str,email_verified:bool,expires_delta: Optional[timedelta] = None) -> str:
    """ Creates JWT Access Token"""

    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode = {
        "sub":str(subject),
        "email_verified":email_verified,
        "iss":"https://yourdomain.com", # We will figure out how to add the iss later
        "role":role,
        "iat":datetime.now(UTC),
        "exp":expire,
    }

    ## Creating and Signing access token
    encode_jwt = jwt.encode(
        to_encode,
        settings.secret_key, 
        algorithm=[settings.algorithm])

    return encode_jwt

def create_refresh_token(subject:str) -> str:
    """ Create JWT refresh token"""

    expire = datetime.now() + timedelta(days=settings.refresh_token_expire_days)

    to_encode = {
        "sub":str(subject),
        "ver":1,
        "jti":uuid4(),
        "iss":"https://yourdomain.com",
        "iat":datetime.now(UTC),
        "exp":expire,
    }

    encode_jwt = jwt.encode(
        to_encode, 
        settings.secret_key, 
        algorithm=[settings.algorithm]
    )

    return encode_jwt
    

def decode_token(token:str) -> Dict[str,Any]:
    """ Decode JWT token to verify it"""

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])

        if not payload:
            raise ValueError("Invalid token!")
        
        return payload
    except JWTError:
        return None