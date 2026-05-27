from fastapi import APIRouter
from app.core.config import settings


router = APIRouter(tags=["health"])

@router.get("/")
def health():
    return {"status": "ok"}