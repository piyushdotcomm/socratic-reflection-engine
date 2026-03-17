from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    DEFAULT_LLM_PROVIDER: str = "gemini"

    model_config = {"env_file": ".env"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
