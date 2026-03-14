
from fastapi import FastAPI
from app.routes.user_routes import router as user_router
from app.config.index import settings

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello Sathish"}

@app.get("/health")
async def health():
    return {"status": "ok"}