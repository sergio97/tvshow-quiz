from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text


question_format_column = Column("question_format", String(255))
conflict_domains_column = Column("conflict_domains", Text)


def upgrade(migrate_engine):
    metadata = MetaData()
    metadata.bind = migrate_engine

    question_table = Table('question', metadata, autoload=True)
    question_format_column.create(question_table)
    conflict_domains_column.create(question_table)

def downgrade(migrate_engine):
    metadata = MetaData()
    metadata.bind = migrate_engine

    question_table = Table('question', metadata, autoload=True)
    question_table.c[question_format_column.name].drop()
    question_table.c[conflict_domains_column.name].drop()
