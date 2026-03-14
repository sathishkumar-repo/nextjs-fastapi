from fastapi import APIRouter
from app.schemas.user_schema import User

router = APIRouter()

@router.get("/users", response_model=list[User])
async def users():
    return [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"}
    ]