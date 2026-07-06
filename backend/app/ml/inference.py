from app.ml.loader import model
from app.ml.preprocessing import preprocess


def predict(df):

    engine_ids, features = preprocess(df)

    predictions = model.predict(features)

    return engine_ids, predictions