import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
@pytest.mark.skip(reason="Requires DATABASE_URL and LLM API keys — integration test")
async def test_start_session():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.post(
            "/reflect/start",
            json={
                "project_type": "I built a music composition using Music Blocks today",
                "strategy": "gibbs",
                "age_group": "teen",
                "llm_provider": "gemini",
            },
        )
    assert response.status_code == 201
    data = response.json()
    assert "session_id" in data
    assert "opening_question" in data
    assert data["strategy"] == "gibbs"


@pytest.mark.asyncio
@pytest.mark.skip(reason="Requires DATABASE_URL and LLM API keys — integration test")
async def test_respond():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        start_response = await client.post(
            "/reflect/start",
            json={
                "project_type": "I wrote a Python script to automate my homework",
                "strategy": "socratic",
                "age_group": "teen",
                "llm_provider": "gemini",
            },
        )
        session_id = start_response.json()["session_id"]

        response = await client.post(
            "/reflect/respond",
            json={
                "session_id": session_id,
                "content": "I made a script that reads my textbook and summarizes it",
            },
        )
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert data["session_id"] == session_id


@pytest.mark.asyncio
@pytest.mark.skip(reason="Requires DATABASE_URL — integration test")
async def test_get_history():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/reflect/history/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404
