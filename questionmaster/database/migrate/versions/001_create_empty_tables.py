from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Text


metadata = MetaData()
question_table = Table('question', metadata,
    Column('id', String(255), primary_key=True),
    Column('added', DateTime, nullable=False),
    Column('text', String(255), nullable=False),
    Column('hint', String(255), nullable=False),
    Column('options', String(255)),
    Column('answer_format', String(255), nullable=False),
    Column('answer', Text, nullable=False),
    Column('difficulty', Integer, nullable=False),
    Column('author', String(255), nullable=False),
)


def upgrade(migrate_engine):
    metadata.bind = migrate_engine
    question_table.create()


def downgrade(migrate_engine):
    metadata.bind = migrate_engine
    question_table.drop()
