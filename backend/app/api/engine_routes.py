from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.enums.engine_status import EngineStatus
from app.db.dependencies import get_db
from app.schemas.engine import EngineCreate, EngineResponse
from app.services.engine_service import (
    create_engine,
    get_engine_by_id,
    get_engines,
)

router = APIRouter(
    prefix="/engines",
    tags=["Engines"],
)


@router.post(
    "",
    response_model=EngineResponse,
    status_code=status.HTTP_201_CREATED,
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
    search: str | None = None,
    manufacturer: str | None = None,
    status: EngineStatus | None = None,
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    return get_engines(
        db=db,
        search=search,
        manufacturer=manufacturer,
        status=status,
        page=page,
        limit=limit,
    )


@router.get(
    "/{engine_id}",
    response_model=EngineResponse,
)
def get_engine_by_id_endpoint(
    engine_id: int,
    db: Session = Depends(get_db),
):
    engine = get_engine_by_id(
        db=db,
        engine_id=engine_id,
    )

    if engine is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Engine not found",
        )

    return engine
