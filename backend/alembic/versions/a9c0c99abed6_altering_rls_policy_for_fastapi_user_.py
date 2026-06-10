"""Altering rls policy for fastapi_user role

Revision ID: a9c0c99abed6
Revises: 9ede6ad81ab2
Create Date: 2026-06-09 22:16:26.266220

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a9c0c99abed6'
down_revision: Union[str, Sequence[str], None] = '9ede6ad81ab2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(" ALTER ROLE fastapi_user BYPASSRLS;")

    op.execute("REVOKE ALL ON TABLE auth_credentials FROM authenticated;")
    pass


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("ALTER ROLE fastapi_user NOBYPASSRLS;")
    op.execute("GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE auth_credentials TO authenticated;")
    pass
