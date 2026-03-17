import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import (
    StartSession,
    UserMessage,
    StartSessionResponse,
    ReflectResponse,
    SessionOut,
    MessageOut,
)
from app.models import Session, Message
from app.services.reflection import generate_opening_question, continue_reflection

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/reflect", tags=["Reflection"])


@router.post(
    "/start",
    response_model=StartSessionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Start a new reflection session",
)
async def start_session(
    body: StartSession,
    db: AsyncSession = Depends(get_db),
) -> StartSessionResponse:
    """
    Create a new reflection session and generate the opening question.
    Returns the session_id and the first AI question.
    """
    try:
        session = Session(
            project_type=body.project_type,
            strategy=body.strategy,
            age_group=body.age_group,
            llm_provider=body.llm_provider,
        )
        db.add(session)
        await db.flush()

        opening = await generate_opening_question(
            body.project_type,
            body.strategy,
            body.age_group,
            body.llm_provider,
        )

        msg = Message(session_id=session.id, role="assistant", content=opening)
        db.add(msg)
        await db.commit()
        await db.refresh(session)

        return StartSessionResponse(
            session_id=session.id,
            strategy=body.strategy,
            opening_question=opening,
        )
    except Exception as e:
        logger.error(f"Error starting session: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to start reflection session",
        )


@router.post(
    "/respond",
    response_model=ReflectResponse,
    summary="Send a user message and get the next reflection question",
)
async def respond(
    body: UserMessage,
    db: AsyncSession = Depends(get_db),
) -> ReflectResponse:
    """
    Accept a student's response and return the next AI reflection question.
    Persists both the user message and AI response to the database.
    """
    session = await db.get(Session, body.session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found",
        )

    try:
        user_msg = Message(
            session_id=session.id, role="user", content=body.content
        )
        db.add(user_msg)
        await db.flush()

        messages = [
            {"role": m.role, "content": m.content}
            for m in session.messages
        ] + [{"role": "user", "content": body.content}]

        response = await continue_reflection(
            messages,
            session.strategy,
            session.project_type,
            session.age_group,
            session.llm_provider,
        )

        assistant_msg = Message(
            session_id=session.id, role="assistant", content=response
        )
        db.add(assistant_msg)
        await db.commit()

        return ReflectResponse(response=response, session_id=session.id)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in reflection response: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate reflection response",
        )


@router.get(
    "/history/{session_id}",
    response_model=SessionOut,
    summary="Get full conversation history for a session",
)
async def get_history(
    session_id: str,
    db: AsyncSession = Depends(get_db),
) -> SessionOut:
    """Return the full conversation history for a given session ID."""
    session = await db.get(Session, session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found",
        )

    return SessionOut(
        session_id=session.id,
        strategy=session.strategy,
        project_type=session.project_type,
        age_group=session.age_group,
        messages=[
            MessageOut(
                role=m.role,
                content=m.content,
                created_at=m.created_at,
            )
            for m in session.messages
        ],
    )
