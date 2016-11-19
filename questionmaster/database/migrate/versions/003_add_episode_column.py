from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import String


episode_column = Column("episode", String(255))


def upgrade(migrate_engine):
    metadata = MetaData()
    metadata.bind = migrate_engine

    question_table = Table('question', metadata, autoload=True)
    episode_column.create(question_table)

def downgrade(migrate_engine):
    metadata = MetaData()
    metadata.bind = migrate_engine

    question_table = Table('question', metadata, autoload=True)
    question_table.c[episode_column.name].drop()
