from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.modules.models.base import Base


class WorkSpaces(Base):
    __tablename__ = "workspaces"

    workspace_id:Mapped[UUID] = mapped_column(
        primary_key=True,
        index=True,
        unique=True,
        nullable=False,
        server_default=func.uuid7(),
        doc="Workspace id",
        comment="ID of the workspace (primary key)")

    workspace_name:Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        doc="Workspace Name",
        comment="The name of the workspace")

    desciption:Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        doc="Description",
        comment="The description of the workspace")
    
    owner_id:Mapped[UUID] = mapped_column(
        ForeignKey('user_profile.id'),
        unique=True,
        server_default=func.uuid7(),
        doc="Workspace Owner",
        comment="The owner of the workspace")

    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        doc="Workspace Creation",
        comment="When the workspace was first created")
    
    updated_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_onupdate=func.now(),
        doc="Workspace Update",
        comment="When the workspace was updated")