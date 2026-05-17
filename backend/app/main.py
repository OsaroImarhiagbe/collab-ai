from fastapi import FastAPI
from app.core.config import get_settings
from app.api.v1.router import router as v1_router


settings = get_settings()

app = FastAPI(
    title=settings.project_name,
    openapi_url=f"{settings.api_v1_str}/openapi.json"
)

app.include_router(v1_router, prefix=settings.api_v1_str)

# app.include_router(auth_router,        prefix="/auth",       tags=["auth"])
# app.include_router(users_router,       prefix="/users",      tags=["users"])
# app.include_router(tasks_router,       prefix="/tasks",      tags=["tasks"])
# app.include_router(workspaces_router,  prefix="/workspaces", tags=["workspaces"])

# WebSocket gateways (no prefix needed, path defined in gateway)
# app.include_router(tasks_ws_router)
# app.include_router(workspaces_ws_router)