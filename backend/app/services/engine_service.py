from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.engine import Engine
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

    db.add(engine)
    db.commit()
    db.refresh(engine)

    return engine 

def get_engines(
    db: Session,
) -> list[Engine]:

    statement = select(Engine)

    engines = db.scalars(statement).all()

    return engines