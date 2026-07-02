from fastapi import FastAPI

from app.api.engine_routes import router as engine_router
from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(engine_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} 🚀",
        "version": settings.APP_VERSION,
        "debug": settings.DEBUG,
    }