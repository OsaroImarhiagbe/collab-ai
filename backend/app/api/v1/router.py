# api/v1/router.py
from fastapi import APIRouter
from app.modules.user.api.v1.users import router as users_router
from app.modules.auth.api.v1.auth import router as auth_router
from app.modules.health.api.v1.health import router as health_router
from app.modules.websockets.api.v1.websockets import router as websocket_router
from app.modules.task.api.v1.task import router as task_router
router = APIRouter()

router.include_router(users_router, prefix="/users")
router.include_router(auth_router, prefix="/auth")
router.include_router(health_router,prefix="/health")
router.include_router(websocket_router,prefix="/ws")
router.include_router(task_router,prefix="/task")