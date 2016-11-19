import logging

from sqlalchemy import or_

from questionmaster.database import session
from questionmaster.database.models import Question


LOG = logging.getLogger(__name__)


def get_questions(difficulty=None, seasons=None):
    query = session.query(Question)

    if difficulty:
        query = query.filter(Question.difficulty == difficulty)

    if seasons:
        clauses = []
        for i in seasons:
            prefix = "S{0}".format(str(i).rjust(2, "0"))
            clauses.append(Question.episode.startswith(prefix))
        query = query.filter(or_(*clauses))

    return query.all()
