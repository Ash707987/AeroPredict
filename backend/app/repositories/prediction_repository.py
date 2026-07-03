from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.prediction import Prediction


class PredictionRepository:

    @staticmethod
    def create(
        db: Session,
        prediction: Prediction,
    ) -> Prediction:

        db.add(prediction)
        db.commit()
        db.refresh(prediction)

        return prediction

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Prediction]:

        statement = (
            select(Prediction)
            .order_by(Prediction.created_at.desc())
        )

        return db.scalars(statement).all()

    @staticmethod
    def get_by_engine(
        db: Session,
        engine_id: int,
    ) -> list[Prediction]:

        statement = (
            select(Prediction)
            .where(Prediction.engine_id == engine_id)
            .order_by(Prediction.created_at.desc())
        )

        return db.scalars(statement).all()