"""altering fastapi_user role

Revision ID: 52a4e7a79983
Revises: a9c0c99abed6
Create Date: 2026-06-09 22:26:32.321875

"""
from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '52a4e7a79983'
down_revision: str | Sequence[str] | None = 'a9c0c99abed6'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("GRANT SELECT, INSERT ON auth_credentials TO fastapi_user")


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("REVOKE SELECT, INSERT ON auth_credentials FROM fastapi_user;")
