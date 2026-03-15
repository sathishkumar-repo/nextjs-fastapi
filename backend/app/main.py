
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.user_routes import router as user_router
from app.config.settings import settings
from app.db.session import engine
from app.db.base import Base

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

if settings.CORS_ORIGIN != "":
    cors_setting = settings.CORS_ORIGIN
else:
    cors_setting = "*"

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello Sathish"}

@app.get("/health")
async def health():
    return {"status": "ok"}