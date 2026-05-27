from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import func,String,DateTime,ForeignKey
from app.modules.models.base import Base
from datetime import datetime
from uuid import UUID


class User_Profile(Base):

    __tablename__ = "user_profile"

    id:Mapped[UUID] = mapped_column(primary_key=True, index=True,unique=True,server_default=func.gen_random_uuid())# this is using v4 uuid

    user_id:Mapped[UUID] = mapped_column(ForeignKey('auth_credentials.user_id'),nullable=False)

    name:Mapped[str] = mapped_column(String(30),nullable=False)


    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True),server_onupdate=func.now())