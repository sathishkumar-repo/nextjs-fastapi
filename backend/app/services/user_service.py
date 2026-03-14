from app.schemas.user_schema import User, UserCreate

user_db = [
    User(id = 1, name = "Alice"),
    User(id = 2, name = "Bob"),
    User(id = 3, name = "Charlie")
]

def get_users():
    users = user_db
    return users

def create_user(user: UserCreate):
    new_user = User(id=len(user_db) + 1, name = user.name)
    user_db.append(new_user)
    return new_user