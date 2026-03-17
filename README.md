# Socratic Reflection Engine

An AI-powered reflective learning mentor built as a prototype for [Sugar Labs](https://sugarlabs.org/). 

The engine guides students through structured self-reflection using evidence-based frameworks, helping them develop metacognitive skills through Socratic dialogue rather than direct instruction. It features a modern web interface and a robust AI-driven API.

## Features

- **Guided Reflection Strategies:**
  - **Gibbs Reflective Cycle:** 6-stage structured reflection (Description, Feelings, Evaluation, Analysis, Conclusion, Action Plan).
  - **Kolb Experiential Learning:** 4-stage experiential cycle (Concrete Experience, Reflective Observation, Conceptualization, Experimentation).
  - **Socratic Questioning:** Open-ended critical thinking dialogue (Clarifying, Probing assumptions, Viewpoints, Implications).
- **Targeted Age Groups:** Adaptive interactions for Child (under 12), Teen (12–17), and Adult (18+).
- **Multiple AI Providers:** Choose between Google Gemini 2.0 Flash and Groq (Llama 3.3 70b).
- **Session History:** Automatically saves reflection sessions for later review.

## Architecture

The project is structured as a monorepo consisting of:

- `frontend/`: A Next.js 15 App Router web application using Tailwind CSS, shadcn/ui, and Zustand for state management.
- `backend/`: A highly concurrent Python FastAPI backend using async PostgreSQL (asyncpg), async SQLAlchemy over Alembic, and Pydantic v2.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.11+)
- PostgreSQL (Local or managed like Neon)

### 1. Backend Setup

> [!NOTE]
> Ensure you have an active PostgreSQL database and API keys for Gemini and Groq.

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL, GEMINI_API_KEY, and GROQ_API_KEY

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
- Tailwind CSS v4 & shadcn/ui
- Zustand (State Management)
- TypeScript

**Backend**
- FastAPI & Python 3.11
- PostgreSQL & asyncpg
- SQLAlchemy (async) & Alembic
- Google Generative AI SDK & Groq SDK
- Pydantic v2
