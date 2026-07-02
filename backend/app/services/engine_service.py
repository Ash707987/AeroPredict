from sqlalchemy.orm import Session

from app.models.engine import Engine
from app.repositories.engine_repository import EngineRepository
from app.schemas.engine import EngineCreate


def create_engine(
    db: Session,
    engine_data: EngineCreate,
) -> Engine:

    engine = Engine(
        engine_code=engine_data.engine_code,
        manufacturer=engine_data.manufacturer,
        model=engine_data.model,
    )

    return EngineRepository.create(
        db=db,
        engine=engine,
    )


def get_engines(
    db: Session,
    search: str | None = None,
    manufacturer: str | None = None,
    status: EngineStatus | None = None,
    page: int = 1,
    limit: int = 20,
) -> list[Engine]:

    return EngineRepository.get_all(
        db=db,
        search=search,
        manufacturer=manufacturer,
        status=status,
        page=page,
        limit=limit,
    )


def get_engine_by_id(
    db: Session,
    engine_id: int,
) -> Engine | None:

    return EngineRepository.get_by_id(
        db=db,
        engine_id=engine_id,
    )