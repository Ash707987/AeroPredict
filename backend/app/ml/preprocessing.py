import pandas as pd

COLUMNS = [
    "unit_number",
    "time_in_cycles",
]

COLUMNS += [f"operational_setting_{i}" for i in range(1, 4)]

COLUMNS += [f"sensor_{i}" for i in range(1, 22)]


DROP_COLUMNS = [
    "sensor_1",
    "sensor_5",
    "sensor_6",
    "sensor_10",
    "sensor_16",
    "sensor_18",
    "sensor_19",
    "operational_setting_3",
]


def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    # NASA files sometimes contain two empty columns
    df = df.iloc[:, :26]

    # Assign column names
    df.columns = COLUMNS

    # Remove columns not used during training
    df = df.drop(columns=DROP_COLUMNS)

    # Remove unit number because the model wasn't trained on it
    df = df.drop(columns=["unit_number"])

    return df