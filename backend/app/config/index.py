from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "NextJS FastAPI Project"
    APP_VERSION: str = "v1.0.0"

settings = Settings()