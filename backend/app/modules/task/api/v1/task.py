from fastapi import APIRouter, Depends, HTTPException,status
from app.modules.task.schemas.task import TaskReqest
from app.modules.task.service.dependencies import get_task_service
from app.modules.task.service.task_service import TaskService
from app.modules.task.schemas.task import TaskResponse,TaskUpdateRequest
from typing import Annotated
from uuid import UUID

router = APIRouter(tags=["task"])

get_task_service_dependency = Annotated[TaskService,Depends(get_task_service)]

# /workspaces/{workspaceId}/tasks/{taskId}
@router.post("/",response_model=TaskResponse)
async def create(request:TaskReqest,service:get_task_service_dependency) -> TaskResponse:
    """
    Create a new task
    """
    try:
        response = await service.create_task_in_db(workspace_id=request.workspace_id,user_id=request.user_id,task_name=request.task_name)
        return response
    except LookupError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(f"{e}")
            )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f"{e}")
        )


@router.patch('/{task_id}')
async def update_task(task_id:UUID,request:TaskUpdateRequest):
    pass