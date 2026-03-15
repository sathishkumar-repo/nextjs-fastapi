from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository


class UserService:

    def __init__(self):
        self.repo = UserRepository()

    def create_user(self, db: Session, name: str):
        return self.repo.create(db, name=name)

    def get_users(self, db: Session):
        return self.repo.get_all(db)

    def update_user(self, db: Session, user_id: int, name: str):
        return self.repo.update(db, obj_id=user_id, name=name)
    
    def delete_user(self, db: Session, user_id: int):
        print(f"Service - Attempting to delete user with ID: {user_id}")  # Debugging line
        return self.repo.delete(db, obj_id=user_id)