from fastapi import APIRouter
from app.schemas.user_schema import User, UserCreate
from app.services.user_service import get_users, create_user

router = APIRouter()

@router.get("/users", response_model=list[User])
async def list_users():
    return get_users()

@router.post("/users", response_model=User)
async def add_user(user: UserCreate):
    return create_user(user)