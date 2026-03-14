
from fastapi import FastAPI
from app.routes.user_routes import router as user_router
from app.config.settings import settings
from app.db.session import engine
from app.db.base import Base

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello Sathish"}

@app.get("/health")
async def health():
    return {"status": "ok"}