from app.db.base import Base
from app.db.database import engine

# Import all models so SQLAlchemy knows about them
import app.models

def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("✅ Database tables created successfully!")