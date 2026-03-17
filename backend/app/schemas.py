from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from uuid import UUID
from datetime import datetime


class StartSession(BaseModel):
    user_id: Optional[str] = Field(None, max_length=50)
    project_type: str = Field(..., min_length=5, max_length=500)
    strategy: Literal["gibbs", "kolb", "socratic"]
    age_group: Optional[Literal["child", "teen", "adult"]] = "teen"
    llm_provider: Optional[Literal["gemini", "groq"]] = "gemini"


class UserMessage(BaseModel):
    session_id: UUID
    content: str = Field(..., min_length=1, max_length=2000)


class MessageOut(BaseModel):
    role: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SessionOut(BaseModel):
    session_id: UUID
    strategy: str
    project_type: str
    age_group: str
    messages: List[MessageOut]

    model_config = {"from_attributes": True}


class StartSessionResponse(BaseModel):
    session_id: UUID
    strategy: str
    opening_question: str


class ReflectResponse(BaseModel):
    response: str
    session_id: UUID
