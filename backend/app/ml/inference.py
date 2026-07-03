import pandas as pd

from app.ml.loader import model
from app.ml.preprocessing import preprocess


def predict(df: pd.DataFrame):

    processed = preprocess(df)

    predictions = model.predict(processed)

    return predictions