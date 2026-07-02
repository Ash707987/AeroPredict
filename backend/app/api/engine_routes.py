from typing import Generator

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.schemas.engine import EngineCreate, EngineResponse
from app.services.engine_service import create_engine
from app.services.engine_service import (
    create_engine,
    get_engines,
)

router = APIRouter(
    prefix="/engines",
    tags=["Engines"],
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post(
    "",
    response_model=EngineResponse,
    status_code=201,
)
def create_engine_endpoint(
    engine: EngineCreate,
    db: Session = Depends(get_db),
):
    return create_engine(
        db=db,
        engine_data=engine,
    )
    
@router.get(
    "",
    response_model=list[EngineResponse],
)
def get_engines_endpoint(
    db: Session = Depends(get_db),
):
    return get_engines(db)