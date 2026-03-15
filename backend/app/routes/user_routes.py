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

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    return service.update_user(db, user_id, user.name)  

@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    print(f"Routes - Attempting to delete user with ID: {user_id}")  # Debugging line
    return service.delete_user(db, user_id)