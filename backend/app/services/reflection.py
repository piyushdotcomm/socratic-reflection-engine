import logging
from typing import List, Dict

from app.prompts.fiver import FIVER_SYSTEM_PROMPT
from app.prompts.gibbs import GIBBS_SYSTEM_PROMPT
from app.prompts.kolb import KOLB_SYSTEM_PROMPT
from app.prompts.socratic import SOCRATIC_SYSTEM_PROMPT
from app.services.offline_fallback import get_llm_response_with_fallback

logger = logging.getLogger(__name__)

STRATEGY_PROMPTS: Dict[str, str] = {
    "gibbs": GIBBS_SYSTEM_PROMPT,
    "kolb": KOLB_SYSTEM_PROMPT,
    "socratic": SOCRATIC_SYSTEM_PROMPT,
    "5r": FIVER_SYSTEM_PROMPT,
}


def build_system_prompt(strategy: str, project_type: str, age_group: str) -> str:
    """Build a formatted system prompt for the given strategy and context."""
    template = STRATEGY_PROMPTS.get(strategy)
    if not template:
        raise ValueError(f"Unknown strategy: {strategy}")
    return template.format(project_type=project_type, age_group=age_group)


async def generate_opening_question(
    project_type: str,
    strategy: str,
    age_group: str,
    provider: str = "gemini",
) -> str:
    """Generate the first question to open a reflection session."""
    system_prompt = build_system_prompt(strategy, project_type, age_group)
    messages = [
        {
            "role": "user",
            "content": f"I just finished working on this: {project_type}. Please start our reflection session.",
        }
    ]
    return await get_llm_response_with_fallback(messages, system_prompt, provider, strategy, 0)


async def continue_reflection(
    messages: List[Dict[str, str]],
    strategy: str,
    project_type: str,
    age_group: str,
    provider: str = "gemini",
) -> str:
    """Generate the next reflection question given the full conversation history."""
    system_prompt = build_system_prompt(strategy, project_type, age_group)
    return await get_llm_response_with_fallback(messages, system_prompt, provider, strategy, len(messages))
