from app.infrastructure.db.session import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator
from app.middleware.dependencies import get_current_user
from fastapi import Depends
from typing import Annotated, Dict
from sqlalchemy import text
get_current_user_dependency = Annotated[Dict,Depends(get_current_user)]

async def get_db(current_user:get_current_user_dependency):
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
            await session.execute(text("SET LOCAL ROLE authenticated"))
            await session.execute(
                    text("SET LOCAL app.current_user_id = :user_id"),
                    {"user_id": str(current_user.id)}
                )
            yield session
            # will let each API endpoint commit to the db
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()