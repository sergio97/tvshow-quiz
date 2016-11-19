import os
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import scoped_session
from zope.sqlalchemy import ZopeTransactionExtension

from migrate.versioning import api as migrate_api

from questionmaster.database.model_base import ModelBase


LOG = logging.getLogger(__name__)


session = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))

def _check_database_version(engine, repo_path):
    # Check for completely empty database
    if "migrate_version" not in engine.table_names():
        migrate_api.version_control(engine, repo_path)

    # Upgrade the db version if needed
    repo_version = migrate_api.version(repo_path)
    db_version = migrate_api.db_version(engine, repo_path)
    LOG.debug("repo version: %d, db version: %d", repo_version, db_version)
    if repo_version > db_version:
        LOG.warn("Upgrading the database from version %d to %d",
                 db_version, repo_version)
        migrate_api.upgrade(engine, repo_path)


def initialize(connection_string):
    engine = create_engine(connection_string, echo=False)
    meta = ModelBase.metadata
    meta.bind = engine

    here = os.path.dirname(os.path.relpath(__file__))
    migrate_repo = os.path.join(here, "migrate")

    _check_database_version(engine, migrate_repo)
