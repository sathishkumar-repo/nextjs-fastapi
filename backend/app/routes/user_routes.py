from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserResponse
from app.services.user_service import UserService
from app.dependencies.user_dependencies import get_db

router = APIRouter(prefix="/users", tags=["Users"])

service = UserService()


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return service.create_user(db, user.name)


@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return service.get_users(db)