from backend.app.infrastructure.db.session import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator

async def get_db():
    async with AsyncSessionLocal() as session:
        """FastAPI dependency that yields one database session per request.
    
        Usage in a route:
            from fastapi import Depends
            from app.db.session import get_db
    
            @router.get("/items")
            async def list_items(db: AsyncSession = Depends(get_db)):
                ...
    
        The session is:
        - rolled back automatically on any exception
        - always closed after the response is sent
    """
        try:
            yield session
            # will let each API endpoint commit to the db
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
            raise