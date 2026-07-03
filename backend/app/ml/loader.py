from pathlib import Path

import joblib

MODEL_PATH = (
    Path(__file__).parent
    / "artifacts"
    / "model.joblib"
)

model = joblib.load(MODEL_PATH)