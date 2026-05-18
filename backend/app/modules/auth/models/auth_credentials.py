from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import (
    String,
    BOOLEAN,
    func, 
    DATETIME)
from app.modules.models.base import Base
import uuid
from uuid import UUID
from app.modules.auth.schemas.auth import Role, Verified


class Auth_Credentials(Base):

    __tablename__ = "auth_credentials"

    user_id:Mapped[UUID] = mapped_column(primary_key=True, index=True,unique=True,server_default=uuid.uuid4()) ## this is using v4 uuid

    email:Mapped[str] = mapped_column(String(30),unique=True,nullable=False)

    hashed_password:Mapped[str] = mapped_column(String(100),unique=True,nullable=False)

    is_verified:Mapped[BOOLEAN] = mapped_column(server_default=Verified.verified,nullable=False)

    role:Mapped[str] = mapped_column(String(10),server_default=Role.USER,nullable=False)
    
    created_at:Mapped[DATETIME] = mapped_column(DATETIME, server_default=func.now())
    updated_at:Mapped[DATETIME] = mapped_column(DATETIME,server_onupdate=func.now())