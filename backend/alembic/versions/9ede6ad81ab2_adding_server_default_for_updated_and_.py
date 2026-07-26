"""adding server default for updated and last_login column in auth_credentials table

Revision ID: 9ede6ad81ab2
Revises: c37496d89102
Create Date: 2026-06-09 20:41:04.699857

"""
from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '9ede6ad81ab2'
down_revision: str | Sequence[str] | None = 'c37496d89102'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('auth_credentials', 'updated_at',
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=sa.text('now()'),
        existing_nullable=False,
        comment='When the user was updated'
        )
    op.alter_column('auth_credentials', 'last_login',
        existing_type=postgresql.TIMESTAMP(timezone=True),
        server_default=sa.text('now()'),
        existing_nullable=False,
        comment="User's last login attempt"
    )

def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('auth_credentials','updated_at',
            existing_type=postgresql.TIMESTAMP(timezone=True),
            comment=None,
            existing_comment='When the user was updated',
            existing_nullable=False
    )
    op.drop_column('auth_credentials','last_login')