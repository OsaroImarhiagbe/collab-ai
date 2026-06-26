from typing import Any, Annotated, Dict
from fastapi import APIRouter,Depends, HTTPException, status
from pydantic import ValidationError
from app.modules.workspaces.service.workspace_service import WorkSpaceService
from app.modules.workspaces.service.dependencies import get_workspace_service
from app.modules.workspaces.schemas.workspace import WorkSpaceRequest,WorkSpaceResponse
from app.middleware.dependencies import get_current_user
# To Do: Finish out refresh token endpoint and register user endpoint


get_workspace_service_dependency = Annotated[WorkSpaceService, Depends(get_workspace_service)]
get_current_user_dependency = Annotated[Dict,Depends(get_current_user)]


# /workspaces/{workspaceId}/tasks
router = APIRouter(tags=["workspace"])

@router.post('/create',response_model=WorkSpaceResponse)
async def create_workspace(request:WorkSpaceRequest,workspace_service: get_workspace_service_dependency,current_user:get_current_user_dependency) -> WorkSpaceResponse:
    """
    Function endpoints creates a workspace
    """
    try:
        response = await workspace_service.create_workspace(workspace_name=request.name,workspace_owner_id=request.user_id)
        return response
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(f'{e}')
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(f'{e}')
        )

