from app.infrastructure.redis.client import redis_client


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
