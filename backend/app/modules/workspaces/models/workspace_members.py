from sqlalchemy.orm import Mapped, mapped_column
from app.modules.models.base import Base
from sqlalchemy import func,String, DateTime,ForeignKey
from uuid import UUID
from datetime import datetime
from app.modules.workspaces.schemas.workspace import Workspace_Roles

class WorkSpaceMembers(Base):

    """
     Junction table connecting workspace with users as members
    """
    __tablename__ = 'workspace_members'

    id:Mapped[UUID] = mapped_column(
        primary_key=True,
        index=True,
        nullable=False,
        server_default=func.uuid7(),
        doc="Memebr ID",
        comment="Workspace memebr id")

    workkspace_id:Mapped[UUID] = mapped_column(
        ForeignKey('workspaces.id'),
        nullable=False,
        doc="workspace id",
        comment="ID of the workspace the memebrs belong to")

    user_id:Mapped[UUID] = mapped_column(
        ForeignKey('user_profile.user_id'),
        nullable=False,
        doc="User ID",
        comment="The ID of the user")

    role:Mapped[str] = mapped_column(
        String(30),nullable=False,
        server_default=Workspace_Roles.ADMIN.value,
        doc="Member Role",
        comment="The role of the member")
    
    joined_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(),
        doc="Joined date",
        comment="when the memebr joined the workspace")
    
    updated_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_onupdate=func.now(),
        doc="Member update",
        comment="Updated time of memeber")