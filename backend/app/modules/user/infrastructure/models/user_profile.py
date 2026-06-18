from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import func,String,DateTime,ForeignKey
from app.modules.models.base import Base
from datetime import datetime
from uuid import UUID


class User_Profile(Base):

    __tablename__ = "user_profile"

    id:Mapped[UUID] = mapped_column(
        primary_key=True, 
        index=True,
        server_default=func.uuid7(),
        doc="ID",
        comment="Id representing a user within the table")

    user_id:Mapped[UUID] = mapped_column(
        ForeignKey('auth_credentials.user_id'),
        nullable=False,
        doc="User ID",
        comment="The id of the user")

    name:Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        doc="Name",
        comment="The name of the user")

    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(),
        doc="Created At",
        comment="When the user was first created")
    
    updated_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_onupdate=func.now(),
        doc="Updated At",
        comment="When the user was updated")