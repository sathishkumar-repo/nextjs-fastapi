from fastapi import APIRouter
from app.schemas.user_schema import User
from app.services.user_service import get_users

router = APIRouter()

@router.get("/users", response_model=list[User])
async def list_users():
    return get_users()