import json
import logging
from pathlib import Path
from typing import List, Dict

from app.services.llm import get_llm_response

logger = logging.getLogger(__name__)

_PROMPTS_PATH = Path(__file__).parent.parent / "reflection_prompts.json"

with open(_PROMPTS_PATH, "r") as f:
    _OFFLINE_PROMPTS: Dict[str, List[str]] = json.load(f)


def get_offline_prompt(strategy: str, turn: int) -> str:
    """Return a preset question from the offline bundle."""
    prompts = _OFFLINE_PROMPTS.get(strategy, _OFFLINE_PROMPTS["gibbs"])
    return prompts[turn % len(prompts)]


async def get_llm_response_with_fallback(
    messages: List[Dict[str, str]],
    system_prompt: str,
    provider: str,
    strategy: str,
    turn: int,
) -> str:
    """Call the LLM provider, falling back to offline prompts on any failure."""
    try:
        return await get_llm_response(messages, system_prompt, provider)
    except Exception as e:
        logger.warning(f"LLM provider '{provider}' failed, using offline fallback: {e}")
        return get_offline_prompt(strategy, turn)
