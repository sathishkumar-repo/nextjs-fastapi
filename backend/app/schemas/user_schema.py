from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str


class UserResponse(BaseModel):
    id: int
    name: str

    class Config:
        # This allows Pydantic to convert SQLAlchemy models → JSON response.
        from_attributes = True