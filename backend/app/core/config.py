import os
from pydantic_settings import BaseSettings, SettingsConfigDict
import secrets
from functools import lru_cache

class Settings(BaseSettings):
    environment:str = os.getenv('ENVIRONMENT','Development')
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI JWT Auth"
    # Security settings
    SECRET_KEY: str = secrets.token_urlsafe(32)

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    ALGORITHM: str = "HS256"
    # Configuration for the model
    model_config = SettingsConfigDict(
        env_file=f".env.{environment}", 
        env_file_encoding="utf-8"
    )
    
# @lru_cache(maxsize=32) // look into least recently used for caching and how it applies for pydantic settings
def get_settings():
    """ Return the settings class to be used within the backend application"""
    return Settings()
