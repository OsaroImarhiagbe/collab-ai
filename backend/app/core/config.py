import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr

class Settings(BaseSettings):
    environment:str 
    api_v1_str: str = "/api/v1"
    project_name: str = "FastAPI JWT Auth"

    # Security settings
    secret_key: SecretStr

    # jwt access + refresh token
    access_token_expire_minutes: int
    refresh_token_expire_days: int

    algorithm: str

    # Redia
    redis_host:str
    redis_db:int
    redis_port:int
    redis_password:str
    

    # Configuration for the model
    model_config = SettingsConfigDict(
        env_file=f".env.{environment}", 
        env_file_encoding="utf-8",
        case_sensitive=False
    )
    


try:
    settings = Settings()
    print("Environment settings are available!")
except Exception as e:
    print(f'Booting environment error:{e}')
    exit(1) # what does this do?
