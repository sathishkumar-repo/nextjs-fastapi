
from fastapi import FastAPI
from app.routes.user_routes import router as user_router

app = FastAPI()

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello Sathish"}

@app.get("/health")
async def health():
    return {"status": "ok"}