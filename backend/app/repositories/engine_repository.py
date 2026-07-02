from sqlalchemy import or_, select
from sqlalchemy.orm import Session
from app.enums.engine_status import EngineStatus
from app.models.engine import Engine


class EngineRepository:

    @staticmethod
    def create(
        db: Session,
        engine: Engine,
    ) -> Engine:

        db.add(engine)
        db.commit()
        db.refresh(engine)

        return engine

    @staticmethod
    def get_all(
        db: Session,
        search: str | None = None,
        manufacturer: str | None = None,
        status: EngineStatus | None = None,
        page: int = 1,
        limit: int = 20,
    ) -> list[Engine]:

        statement = select(Engine)

        if search:
            statement = statement.where(
                or_(
                    Engine.engine_code.ilike(f"%{search}%"),
                    Engine.manufacturer.ilike(f"%{search}%"),
                    Engine.model.ilike(f"%{search}%"),
                )
            )

        if manufacturer:
            statement = statement.where(
                Engine.manufacturer == manufacturer
            )

        if status:
            statement = statement.where(
                Engine.status == status
            )

        offset = (page - 1) * limit

        statement = (
            statement
            .offset(offset)
            .limit(limit)
        )

        return db.scalars(statement).all()

    @staticmethod
    def get_by_id(
        db: Session,
        engine_id: int,
    ) -> Engine | None:

        statement = (
            select(Engine)
            .where(Engine.id == engine_id)
        )

        return db.scalar(statement)