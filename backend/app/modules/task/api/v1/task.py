from fastapi import APIRouter, Depends, HTTPException,status
from app.modules.task.schemas.task import TaskReqest
from app.modules.task.service.dependencies import get_task_service
from app.modules.task.service.task_service import TaskService
from typing import Annotated

router = APIRouter(tags=["task"])

get_task_service_dependency = Annotated[TaskService,Depends(get_task_service)]

@router.post("/")
async def create_task(request:TaskReqest,service:get_task_service_dependency):
    try:
        response = await service.create_task_in_db(workspace_id=request.workspace_id,user_id=request.user_id,task_name=request.task_name)
        return response
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f"{e}")
        )