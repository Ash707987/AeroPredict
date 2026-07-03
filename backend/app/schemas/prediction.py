from datetime import datetime

from pydantic import BaseModel


class PredictionCreate(BaseModel):
    engine_id: int
    predicted_rul: float
    confidence_score: float


class PredictionResponse(BaseModel):
    id: int
    engine_id: int
    predicted_rul: float
    confidence_score: float
    model_version: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }