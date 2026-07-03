from sqlalchemy.orm import Session

from app.models.prediction import Prediction
from app.repositories.prediction_repository import PredictionRepository
from app.schemas.prediction import PredictionCreate


def create_prediction(
    db: Session,
    prediction_data: PredictionCreate,
) -> Prediction:

    prediction = Prediction(
        engine_id=prediction_data.engine_id,
        predicted_rul=prediction_data.predicted_rul,
        confidence_score=prediction_data.confidence_score,
    )

    return PredictionRepository.create(
        db=db,
        prediction=prediction,
    )


def get_predictions(
    db: Session,
) -> list[Prediction]:

    return PredictionRepository.get_all(
        db=db,
    )


def get_engine_predictions(
    db: Session,
    engine_id: int,
) -> list[Prediction]:

    return PredictionRepository.get_by_engine(
        db=db,
        engine_id=engine_id,
    )