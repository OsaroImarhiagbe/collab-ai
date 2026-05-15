import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    environment:str = os.getenv('ENVIRONMENT','development')
    api_v1_str: str = "/api/v1"
    project_name: str = "FastAPI JWT Auth"
    # Security settings
    secret_key: str = os.getenv("SECRET_KEY","")

    access_token_expire_minutes: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES","")
    refresh_token_expire_days: int = os.getenv("REFRESH_TOKEN_EXPIRE_DAYS","")

    algorithm: str = os.getenv("ALGORITHM","")
    # Configuration for the model
    model_config = SettingsConfigDict(
        env_file=f".env.{environment}", 
        env_file_encoding="utf-8",
        case_sensitive=False
    )
    
# @lru_cache(maxsize=32) // look into least recently used for caching and how it applies for pydantic settings
def get_settings():
    """ Return the settings class to be used within the backend application"""
    return Settings()
