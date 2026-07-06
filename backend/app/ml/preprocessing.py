import pandas as pd

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


def preprocess(df: pd.DataFrame):

    required_columns = [
        "unit_number",
        "time_in_cycles",
        "operational_setting_1",
        "operational_setting_2",
        "operational_setting_3",
    ]

    required_columns += [f"sensor_{i}" for i in range(1, 22)]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing columns: {missing_columns}"
        )

    latest = (
        df.sort_values("time_in_cycles")
        .groupby("unit_number")
        .tail(1)
        .reset_index(drop=True)
    )

    engine_ids = latest["unit_number"].tolist()

    features = latest.drop(columns=["unit_number"])

    features = features.drop(columns=DROP_COLUMNS)

    return engine_ids, features