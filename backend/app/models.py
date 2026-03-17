import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base


class Session(Base):
    __tablename__ = "sessions"

    id: uuid.UUID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_type: str = Column(String(500), nullable=False)
    strategy: str = Column(String(50), nullable=False)
    age_group: str = Column(String(20), default="teen")
    llm_provider: str = Column(String(20), default="gemini")
    created_at: datetime = Column(DateTime, default=datetime.utcnow, nullable=False)

    messages = relationship(
        "Message",
        back_populates="session",
        order_by="Message.created_at",
        lazy="selectin",
    )


class Message(Base):
    __tablename__ = "messages"

    id: uuid.UUID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id: uuid.UUID = Column(
        UUID(as_uuid=True), ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False
    )
    role: str = Column(String(20), nullable=False)
    content: str = Column(Text, nullable=False)
    created_at: datetime = Column(DateTime, default=datetime.utcnow, nullable=False)

    session = relationship("Session", back_populates="messages")
