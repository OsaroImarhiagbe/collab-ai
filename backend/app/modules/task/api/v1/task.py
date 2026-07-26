from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.middleware.dependencies import get_current_user
from app.modules.task.schemas.task import (
    TaskReqest,
    TaskResponse,
    TaskUpdateRequest,
    TaskUpdateResponse,
)
from app.modules.task.service.dependencies import get_task_service
from app.modules.task.service.task_service import TaskService

router = APIRouter(tags=["task"])

get_task_service_dependency = Annotated[TaskService,Depends(get_task_service)]
get_current_user_dependency = Annotated[dict,Depends(get_current_user)]


@router.post("/{workspace_id}/tasks",response_model=TaskResponse)
async def create_task(workspace_id:UUID,request:TaskReqest,task_service:get_task_service_dependency) -> TaskResponse:
    """
    Create a new task within a certain workspace 
    """
    try:
        response = await task_service.create_task_in_db(workspace_id,request.user_id,request.task_name)
        return response
    except LookupError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(f"{e}")
            )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f"{e}")
        )

@router.get('/{workspace_id}/tasks',response_model=TaskResponse)
async def get_all_task(workspace_id:UUID,task_service:get_task_service_dependency,current_user:get_current_user_dependency) -> TaskResponse:
    """
    Grab all the task within a certain workspace
    """
    try:
        response = await task_service.get_all_task_in_worksppace(workspace_id)
        return response
    except LookupError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(f"{e}")
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f"{e}")
        )

@router.patch('/{task_id}',response_model=TaskUpdateResponse)
async def update_task(task_id:UUID,request:TaskUpdateRequest,task_service:get_task_service_dependency) -> TaskUpdateResponse:
    ## Websocket service will play into this
    """
    Update an individual task information
    
    """
    try:
        response = await task_service.update_task_information(task_id,request)
        return response
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f"{e}")
        )

# TO DO: finish delete endpoint for a task
@router.delete('/{task_id}/delete')
async def delete_task(task_id:UUID):
    """
    Delete an individual task
    """
