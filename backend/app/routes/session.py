from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import get_db
from app.models import Session

router = APIRouter(prefix="/sessions", tags=["Sessions"])


@router.get("/", summary="List 20 most recent sessions (filtered by user_id if provided)")
async def list_sessions(
    user_id: str | None = None, db: AsyncSession = Depends(get_db)
) -> dict:
    """Return the 20 most recently created reflection sessions."""
    query = select(Session).order_by(Session.created_at.desc()).limit(20)
    if user_id:
        query = query.filter(Session.user_id == user_id)
        
    result = await db.execute(query)
    sessions = result.scalars().all()
    return {
        "sessions": [
            {
                "session_id": str(s.id),
                "project_type": s.project_type,
                "strategy": s.strategy,
                "age_group": s.age_group,
                "created_at": s.created_at.isoformat(),
            }
            for s in sessions
        ]
    }
