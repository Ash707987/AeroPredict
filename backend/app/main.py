from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth_routes import router as auth_router
from app.api.engine_routes import router as engine_router
from app.api.prediction_routes import router as prediction_router
from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(engine_router)
app.include_router(prediction_router)

@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} 🚀",
        "version": settings.APP_VERSION,
        "debug": settings.DEBUG,
    }
