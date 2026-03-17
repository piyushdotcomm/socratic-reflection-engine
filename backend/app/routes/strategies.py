from fastapi import APIRouter

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
        ]
    }
