# Socratic Reflection Engine

An AI-powered reflective learning tool built as a GSoC 2026 prototype for [Sugar Labs](https://sugarlabs.org/). Students describe a project they've worked on, and an AI mentor guides them through structured self-reflection using one of three evidence-based frameworks — helping them develop metacognitive skills through Socratic dialogue rather than direct instruction.

## Repository Structure

| Folder | Description |
|--------|-------------|
| `backend/` | FastAPI backend — AI reflection API |
| `frontend/` | Next.js frontend — coming soon |

→ See [backend/README.md](backend/README.md) for setup and API documentation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend Framework | FastAPI + Python 3.11 |
| Database | PostgreSQL (async via asyncpg + SQLAlchemy) |
| ORM / Migrations | SQLAlchemy (async) + Alembic |
| AI Providers | Google Gemini 2.0 Flash + Groq (Llama 3.3 70b) |
| Validation | Pydantic v2 |
| Deployment | Render + Neon PostgreSQL |
| Frontend (planned) | Next.js |

## Reflection Frameworks

- **Gibbs Reflective Cycle** — 6-stage structured reflection
- **Kolb Experiential Learning** — 4-stage experiential cycle
- **Socratic Questioning** — Open-ended critical thinking dialogue

## License

MIT
