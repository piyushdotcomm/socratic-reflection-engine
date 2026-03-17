# Socratic Reflection Engine — Backend

FastAPI backend for the Socratic Reflection Engine — a GSoC 2026 prototype for Sugar Labs. Students describe a project and are guided through structured AI reflection using Gibbs, Kolb, or Socratic frameworks.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI |
| Database | PostgreSQL (async via asyncpg) |
| ORM | SQLAlchemy (async) |
| Migrations | Alembic (async engine) |
| AI — Provider A | Google Gemini 2.0 Flash |
| AI — Provider B | Groq (Llama 3.3 70b) |
| Validation | Pydantic v2 |
| Deployment | Render + Neon PostgreSQL |

## Running Locally

```bash
cd backend
cp .env.example .env
# Fill in DATABASE_URL, GEMINI_API_KEY, GROQ_API_KEY

pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Open http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check + project info |
| GET | `/health` | Simple health check |
| GET | `/strategies/` | List all reflection strategies |
| POST | `/reflect/start` | Start a new reflection session |
| POST | `/reflect/respond` | Send a message, get next question |
| GET | `/reflect/history/{session_id}` | Full conversation history |
| GET | `/sessions/` | List 20 most recent sessions |

## Example Usage

### Start a session
```bash
curl -X POST http://localhost:8000/reflect/start \
  -H "Content-Type: application/json" \
  -d '{
    "project_type": "I built a music composition using Music Blocks today",
    "strategy": "gibbs",
    "age_group": "teen",
    "llm_provider": "gemini"
  }'
```

Response:
```json
{
  "session_id": "uuid-here",
  "strategy": "gibbs",
  "opening_question": "That sounds interesting! Can you tell me exactly what you created today?"
}
```

### Continue reflection
```bash
curl -X POST http://localhost:8000/reflect/respond \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "content": "I made a song with 3 instruments and it had a chorus that repeated"
  }'
```

## Reflection Strategies

| Strategy | Stages | Best For |
|----------|--------|----------|
| **Gibbs** | 6 stages: Description → Feelings → Evaluation → Analysis → Conclusion → Action Plan | Deep structured reflection |
| **Kolb** | 4 stages: Concrete Experience → Reflective Observation → Abstract Conceptualization → Active Experimentation | Hands-on experience learning |
| **Socratic** | Open questions: Clarifying, Probing assumptions, Evidence, Viewpoints, Implications | Critical thinking development |

## Project Structure

```
backend/
├── app/
│   ├── config.py       ← pydantic-settings
│   ├── database.py     ← async SQLAlchemy
│   ├── models.py       ← Session + Message ORM
│   ├── schemas.py      ← Pydantic v2 schemas
│   ├── main.py         ← FastAPI app entry point
│   ├── routes/         ← reflect, session, strategies
│   ├── services/       ← llm, reflection
│   └── prompts/        ← gibbs, kolb, socratic
├── alembic/            ← async migrations
├── tests/              ← pytest test stubs
├── Dockerfile
└── render.yaml
```

> The frontend lives in `../frontend/` (coming soon).
