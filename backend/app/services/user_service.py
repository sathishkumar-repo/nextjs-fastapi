from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository


class UserService:

    def __init__(self):
        self.repo = UserRepository()

    def create_user(self, db: Session, name: str):
        return self.repo.create(db, name=name)

    def get_users(self, db: Session):
        return self.repo.get_all(db)