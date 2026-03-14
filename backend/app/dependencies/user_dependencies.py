from fastapi import Header
from app.db.session import SessionLocal

def get_request_id(x_request_id: str | None = Header(default=None)):
    return x_request_id

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()