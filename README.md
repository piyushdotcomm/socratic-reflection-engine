<div align="center">
  <h1>Socratic Reflection Engine</h1>
  <p>An AI-powered reflective learning mentor designed as a prototype for Sugar Labs.</p>
</div>

The engine guides students through structured self-reflection using evidence-based frameworks. It helps learners develop metacognitive skills through Socratic dialogue rather than direct instruction, featuring a highly-refined "Editorial Academic" interface and a robust AI-driven API.

## Features

- **Guided Reflection Strategies**
  - **Gibbs Reflective Cycle:** 6-stage structured reflection (Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan).
  - **Kolb Experiential Learning:** 4-stage experiential cycle (Concrete Experience, Reflective Observation, Conceptualization, Experimentation).
  - **Socratic Questioning:** Open-ended critical thinking dialogue (Clarifying, Probing assumptions, Viewpoints, Implications).
- **Targeted Age Groups**: Adaptive interactions for Child (under 12), Teen (12–17), and Adult (18+).
- **Multiple AI Providers**: Native integrations with Featherless (gpt-oss-120b and 20b), Google Gemini 2.0 Flash, and Groq (Llama 3.3 70b).
- **Refined Editorial Interface**: A custom-designed, distraction-free reading experience using `Newsreader` and `DM Sans` typography over warm parchment styling.

## Architecture

The project is structured as a monorepo consisting of:

- `frontend/`: A Next.js 15 App Router web application utilizing Tailwind CSS v4 and Zustand for state management.
- `backend/`: A highly concurrent Python FastAPI backend using async PostgreSQL (`asyncpg`), SQLAlchemy over Alembic, and Pydantic v2.

## Quickstart

### Prerequisites

- Node.js (v18+)
- Python (3.11+)
- PostgreSQL (Local or managed like Neon)

### 1. Backend Setup

> [!NOTE]
> Ensure you have an active PostgreSQL database and at least one API key for the LLM providers (Featherless, Gemini, or Groq).

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and desired API keys

pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`. You can view the interactive documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local: NEXT_PUBLIC_API_URL=http://localhost:8000

npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Tech Stack

**Frontend**
- Next.js 15 (React 19)
- Tailwind CSS v4 & custom Editorial Design System
- Zustand (State Management)
- TypeScript

**Backend**
- FastAPI & Python 3.11
- PostgreSQL & `asyncpg`
- SQLAlchemy (async) & Alembic
- OpenAI Python SDK (Featherless compatible)
- Google Generative AI & Groq SDKs
- Pydantic v2
