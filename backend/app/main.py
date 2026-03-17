import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import reflect, session, strategies

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Socratic Reflection Engine starting up...")
    yield
    logger.info("Socratic Reflection Engine shutting down...")


app = FastAPI(
    title="Socratic Reflection Engine",
    description="AI-powered reflective learning for constructionist education. GSoC 2026 prototype for Sugar Labs.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reflect.router)
app.include_router(session.router)
app.include_router(strategies.router)


@app.get("/", tags=["Health"])
async def root() -> dict:
    return {
        "project": "Socratic Reflection Engine",
        "description": "AI-powered Socratic reflection for constructionist learners",
        "version": "1.0.0",
        "docs": "/docs",
        "strategies": ["gibbs", "kolb", "socratic"],
        "providers": ["gemini", "groq"],
    }


@app.get("/health", tags=["Health"])
async def health() -> dict:
    return {"status": "ok", "version": "1.0.0"}
