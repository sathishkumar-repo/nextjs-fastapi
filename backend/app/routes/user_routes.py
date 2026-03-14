from fastapi import APIRouter, Depends
from app.schemas.user_schema import User, UserCreate
from app.services.user_service import get_users, create_user
from app.dependencies.user_dependencies import get_request_id

router = APIRouter()

@router.get("/users", response_model=list[User])
async def list_users(request_id: str | None = Depends(get_request_id)):
    print("Request ID:",request_id)
    return get_users()

@router.post("/users", response_model=User)
async def add_user(user: UserCreate, request_id: str | None = Depends(get_request_id)):
    print("Request ID:",request_id)
    return create_user(user)