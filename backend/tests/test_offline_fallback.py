import pytest
from app.services.offline_fallback import get_offline_prompt


def test_gibbs_turn_0_returns_first_question():
    result = get_offline_prompt("gibbs", 0)
    assert result == "What did you do in this project?"


def test_gibbs_turn_6_wraps_to_turn_0():
    assert get_offline_prompt("gibbs", 6) == get_offline_prompt("gibbs", 0)


def test_nonexistent_framework_returns_nonempty():
    result = get_offline_prompt("nonexistent_framework", 0)
    assert isinstance(result, str)
    assert len(result) > 0
