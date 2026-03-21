import pytest
from unittest.mock import patch
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_list_strategies_returns_4():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/strategies/")
    assert response.status_code == 200
    data = response.json()
    assert len(data["strategies"]) == 4
    ids = [s["id"] for s in data["strategies"]]
    assert "gibbs" in ids
    assert "kolb" in ids
    assert "socratic" in ids
    assert "5r" in ids


@pytest.mark.asyncio
async def test_recommend_music_blocks_returns_kolb():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/strategies/recommend?activity_type=org.sugarlabs.MusicBlocks")
    assert response.status_code == 200
    data = response.json()
    assert data["recommended_framework"] == "kolb"


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
