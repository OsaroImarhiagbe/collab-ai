from app.infrastructure.redis.client import redis_client
from fastapi import HTTPException,status

def revoke_token(token:str,expires_in:int) -> None:
    """
    Add token to redis blacklist with expiration time
    """

    redis_client.set(f"revoked:{token}",ex=expires_in)

def is_token_revoked(token:str) -> bool:
    """
    Check if token is in blacklist
    """

    return bool(redis_client.get(f"revoked:{token}"))

# checking if refresh token has been revoked since, access token is short lived
def verify_token_not_revoked(token:str) -> None:
    if is_token_revoked(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Token has been revoked',
            headers={"WWW-Authenticate": "Bearer"},
        )
