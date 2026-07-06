from fastapi import APIRouter, Depends
from fastapi import HTTPException
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file.",
        )

    try:
        df = pd.read_csv(file.file)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid CSV file.",
        )

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="Uploaded CSV is empty.",
        )

    engine_ids, predictions = predict(df)

    results = []
    healthy = 0
    warning = 0
    critical = 0

    for engine_id, prediction in zip(engine_ids, predictions):

        prediction = float(prediction)

        if prediction > 120:
            engine_status = "Healthy"
            healthy += 1
        elif prediction > 50:
            engine_status = "Warning"
            warning += 1
        else:
            engine_status = "Critical"
            critical += 1

        #create_prediction(
         #   db=db,
         #   prediction_data=PredictionCreate(
          #      engine_id=int(engine_id),
         #       predicted_rul=prediction,
         #   ),
      #  )

        results.append(
            {
                "engine_id": int(engine_id),
                "predicted_rul": round(prediction, 2),
                "status": engine_status,
            }
        )

    average_rul = round(
        sum(p["predicted_rul"] for p in results) / len(results),
        2,
    )

    return {
        "total_engines": len(results),
        "healthy": healthy,
        "warning": warning,
        "critical": critical,
        "average_rul": average_rul,
        "results": results,
    }


@router.get("/demo")
def demo():

    return {
        "total_engines": 5,
        "healthy": 2,
        "warning": 2,
        "critical": 1,
        "average_rul": 86.7,
        "results": [
            {
                "engine_id": 1,
                "predicted_rul": 185.4,
                "status": "Healthy",
            },
            {
                "engine_id": 2,
                "predicted_rul": 132.8,
                "status": "Healthy",
            },
            {
                "engine_id": 3,
                "predicted_rul": 74.1,
                "status": "Warning",
            },
            {
                "engine_id": 4,
                "predicted_rul": 48.3,
                "status": "Critical",
            },
            {
                "engine_id": 5,
                "predicted_rul": 91.2,
                "status": "Warning",
            },
        ],
    }