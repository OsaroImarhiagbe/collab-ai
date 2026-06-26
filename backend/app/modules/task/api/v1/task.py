from fastapi import APIRouter, Depends, HTTPException,status
from app.modules.task.service.dependencies import get_task_service
from app.modules.task.service.task_service import TaskService
from app.modules.task.schemas.task import TaskResponse,TaskUpdateRequest,TaskReqest
from typing import Annotated
from uuid import UUID

router = APIRouter(tags=["task"])

get_task_service_dependency = Annotated[TaskService,Depends(get_task_service)]

# /workspaces/{workspaceId}/tasks/{taskId}


@router.post("/{workspace_id}/tasks",response_model=TaskResponse)
async def create_task(workspace_id:UUID,request:TaskReqest,service:get_task_service_dependency) -> TaskResponse:
    """
    Create a new task within a certain workspace 
    """
    try:
        response = await service.create_task_in_db(workspace_id=workspace_id,user_id=request.user_id,task_name=request.task_name)
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

@router.get('/{workspace_id}/tasks')
async def get_all_task(workspace_id:UUID):
    """
    Grab all the task within a certain workspace
    """
    pass

@router.patch('/{task_id}')
async def update_task(task_id:UUID,request:TaskUpdateRequest):
    """
    Update an individual task
    
    """
    pass

@router.delete('/{tas_id}')
async def delete_task(task_id:UUID):
    """
    Delete an individual task
    """
    pass