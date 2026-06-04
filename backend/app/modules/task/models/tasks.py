from sqlalchemy.orm import Mapped, mapped_column
from app.modules.models.base import Base
from sqlalchemy import func,String, DateTime,ForeignKey
from uuid import UUID
from datetime import datetime


class Tasks(Base):

    __tablename__ = "tasks"

    id:Mapped[UUID] = mapped_column(
        primary_key=True,
        index=True,
        nullable=False,
        server_default=func.uuid7(),
        doc="Task ID",
        comment="ID of Task")

    title:Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        doc="Task title", 
        comment="The title of the task")

    description:Mapped[str] = mapped_column(
        String(30),
        nullable=True,
        doc="Description", 
        comment="Task description")

    status:Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        doc="Task Status", 
        comment='Status of the task.')

    workspace_id:Mapped[UUID] = mapped_column(
        ForeignKey('workspaces.id'),
        doc="Workspace ID", 
        comment="What workspace the task belong in",
        nullable=False)

    assignee_id:Mapped[UUID] = mapped_column(
        ForeignKey('user_profile.user_id'),
        nullable=False,
        doc="Assignee ID",
        comment="Who the task is assigned to")

    created_by:Mapped[UUID] = mapped_column(
        ForeignKey('user_profile.user_id'),
        doc="Creator ID",
        comment='Who created the task')

    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(), 
        doc="Task Creation", 
        comment="When the task was first created")
    
    updated_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_onupdate=func.now(),
        doc="Task Update",
        comment="When the task was updated")