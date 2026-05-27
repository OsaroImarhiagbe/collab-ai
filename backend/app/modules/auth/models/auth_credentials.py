from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import func,String,Boolean, DateTime
from app.modules.models.base import Base
from uuid import UUID
from app.modules.auth.schemas.auth import Role, Verified
from datetime import datetime

class Auth_Credentials(Base):

    __tablename__ = "auth_credentials"

    user_id:Mapped[UUID] = mapped_column(primary_key=True, index=True,unique=True,server_default=func.gen_random_uuid()) ## this is using v4 uuid

    email:Mapped[str] = mapped_column(String(30),unique=True,nullable=False)

    hashed_password:Mapped[str] = mapped_column(String(100),unique=True,nullable=False)

    is_authenticated:Mapped[bool] = mapped_column(Boolean,server_default=str(Verified.authenticated.value).lower(),nullable=False)

    role:Mapped[str] = mapped_column(String(10),server_default=str(Role.USER.value),nullable=False)
    
    created_at:Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime(timezone=True),server_onupdate=func.now())