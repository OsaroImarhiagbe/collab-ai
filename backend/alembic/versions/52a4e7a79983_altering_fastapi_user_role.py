"""altering fastapi_user role

Revision ID: 52a4e7a79983
Revises: a9c0c99abed6
Create Date: 2026-06-09 22:26:32.321875

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '52a4e7a79983'
down_revision: Union[str, Sequence[str], None] = 'a9c0c99abed6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("GRANT SELECT, INSERT ON auth_credentials TO fastapi_user")
    pass


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("REVOKE SELECT, INSERT ON auth_credentials FROM fastapi_user;")
    pass
