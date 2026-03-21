from fastapi import APIRouter
from app.framework_selector import FrameworkSelector

router = APIRouter(prefix="/strategies", tags=["Strategies"])


@router.get("/", summary="List all available reflection strategies")
async def list_strategies() -> dict:
    """Return all reflection strategies with descriptions and use cases."""
    return {
        "strategies": [
            {
                "id": "gibbs",
                "name": "Gibbs Reflective Cycle",
                "description": "6-stage structured reflection: Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan",
                "best_for": "Deep structured reflection after completing a project",
            },
            {
                "id": "kolb",
                "name": "Kolb Experiential Learning",
                "description": "4-stage cycle: Concrete Experience, Reflective Observation, Abstract Conceptualization, Active Experimentation",
                "best_for": "Learning from hands-on experience",
            },
            {
                "id": "socratic",
                "name": "Socratic Questioning",
                "description": "Open-ended questioning to deepen critical thinking",
                "best_for": "Encouraging independent discovery and deeper thinking",
            },
            {
                "id": "5r",
                "name": "5Rs Framework",
                "description": "5-stage: Report, Respond, Relate, Reason, Reconstruct",
                "best_for": "Depth-adaptive reflection for any project type",
            },
        ]
    }


@router.get("/recommend", summary="Get recommended framework for an activity")
async def recommend_framework(activity_type: str) -> dict:
    """Return the recommended reflection framework for a given Sugar activity bundle ID."""
    return {
        "activity_type": activity_type,
        "recommended_framework": FrameworkSelector.select(activity_type),
    }
