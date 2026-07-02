from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Engine(Base):
    __tablename__ = "engines"

    id: Mapped[int] = mapped_column(primary_key=True)

    engine_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    manufacturer: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    model: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    current_cycle: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Healthy",
    )