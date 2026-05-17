from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import (
    String,
    BOOLEAN,
    func, 
    DATETIME)
from app.models.base import Base
import uuid
from uuid import UUID


class User(Base):

    __tablename__ = "users"

    id:Mapped[UUID] = mapped_column(primary_key=True, index=True,unique=True,server_default=uuid.uuid4())
    email:Mapped[str] = mapped_column(String(30),unique=True,nullable=False)
    hashed_password:Mapped[str] = mapped_column(String(100),unique=True,nullable=False)
    name:Mapped[str] = mapped_column(String(30),nullable=False)
    is_active:Mapped[BOOLEAN] = mapped_column(server_default=True)
    created_at:Mapped[DATETIME] = mapped_column(DATETIME, server_default=func.now())
    updated_at:Mapped[DATETIME] = mapped_column(DATETIME,server_onupdate=func.now())