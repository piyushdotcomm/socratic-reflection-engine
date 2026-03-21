import pytest
from app.framework_selector import FrameworkSelector


def test_music_blocks_maps_to_kolb():
    assert FrameworkSelector.select("org.sugarlabs.MusicBlocks") == "kolb"


def test_turtle_art_maps_to_kolb():
    assert FrameworkSelector.select("org.laptop.TurtleArtActivity") == "kolb"


def test_write_maps_to_gibbs():
    assert FrameworkSelector.select("org.laptop.Write") == "gibbs"


def test_unknown_count_0_returns_gibbs():
    assert FrameworkSelector.select("unknown.app", reflection_count=0) == "gibbs"


def test_unknown_count_1_returns_kolb():
    assert FrameworkSelector.select("unknown.app", reflection_count=1) == "kolb"


def test_unknown_count_2_returns_5r():
    assert FrameworkSelector.select("unknown.app", reflection_count=2) == "5r"


def test_unknown_count_3_wraps_to_gibbs():
    assert FrameworkSelector.select("unknown.app", reflection_count=3) == "gibbs"
