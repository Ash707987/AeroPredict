from pydantic import BaseModel


class EngineCreate(BaseModel):
    engine_code: str
    manufacturer: str
    model: str


class EngineResponse(BaseModel):
    id: int
    engine_code: str
    manufacturer: str
    model: str
    current_cycle: int
    status: str

    model_config = {
        "from_attributes": True
    }