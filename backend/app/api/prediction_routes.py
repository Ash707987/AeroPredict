from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import UploadFile, File
import pandas as pd
from app.ml.inference import predict
from app.core.dependencies import get_current_user
from app.db.dependencies import get_db
from app.models.user import User
from app.schemas.prediction import (
    PredictionCreate,
    PredictionResponse,
)
from app.services.prediction_service import (
    create_prediction,
    get_engine_predictions,
    get_predictions,
)

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


@router.post(
    "",
    response_model=PredictionResponse,
)
def create_prediction_endpoint(
    prediction: PredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_prediction(
        db=db,
        prediction_data=prediction,
    )


@router.get(
    "",
    response_model=list[PredictionResponse],
)
def get_predictions_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_predictions(
        db=db,
    )


@router.get(
    "/engine/{engine_id}",
    response_model=list[PredictionResponse],
)
def get_engine_predictions_endpoint(
    engine_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_engine_predictions(
        db=db,
        engine_id=engine_id,
    )
    
@router.post("/upload")
async def upload_prediction(
    file: UploadFile = File(...),
):
    df = pd.read_csv(
        file.file,
        sep=r"\s+",
        header=None,
    )

    predictions = predict(df)

    return {
        "total_rows": len(predictions),
        "predictions": predictions.tolist(),
    }