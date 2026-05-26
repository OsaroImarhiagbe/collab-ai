from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import (
    String,
    BOOLEAN,
    func,
    ForeignKey,
    DATETIME)
from app.modules.models.base import Base
import uuid
from uuid import UUID


class User_Profile(Base):

    __tablename__ = "user_profile"

    id:Mapped[UUID] = mapped_column(primary_key=True, index=True,unique=True,server_default=func.gen_random_uuid())# this is using v4 uuid

    user_id:Mapped[UUID] = mapped_column(ForeignKey('auth_credentials.id'),nullable=False)

    name:Mapped[str] = mapped_column(String(30),nullable=False)


    created_at:Mapped[DATETIME] = mapped_column(DATETIME, server_default=func.now())
    
    updated_at:Mapped[DATETIME] = mapped_column(DATETIME,server_onupdate=func.now())