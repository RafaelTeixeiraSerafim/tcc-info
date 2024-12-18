"""Add deactivated column to address table

Revision ID: 92386428fe90
Revises: 31f4e0254c08
Create Date: 2024-11-09 13:09:19.408111

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92386428fe90'
down_revision = '31f4e0254c08'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('address', schema=None) as batch_op:
        batch_op.add_column(sa.Column('deactivated', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('address', schema=None) as batch_op:
        batch_op.drop_column('deactivated')

    # ### end Alembic commands ###
