from app.schemas.user_schema import User

def get_users():
    users = [
        User(id = 1, name = "Alice"),
        User(id = 2, name = "Bob"),
        User(id = 3, name = "Charlie")
    ]
    return users