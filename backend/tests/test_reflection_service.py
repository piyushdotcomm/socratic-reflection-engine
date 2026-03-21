import pytest
from app.services.reflection import build_system_prompt


def test_build_prompt_gibbs_contains_project_type():
    result = build_system_prompt("gibbs", "TurtleArt spiral", "child")
    assert "TurtleArt spiral" in result


def test_build_prompt_5r_nonempty():
    result = build_system_prompt("5r", "Music composition", "teen")
    assert isinstance(result, str)
    assert len(result) > 0


def test_build_prompt_invalid_strategy_raises():
    with pytest.raises(ValueError):
        build_system_prompt("invalid_strategy", "x", "teen")
