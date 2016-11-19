import random
import logging

from pyramid.view import view_config

from questionmaster.database import api


# Limit the response to only x number of questions
QUESTIONS_TO_RETURN = 6
LOG = logging.getLogger(__name__)


@view_config(route_name="get_quiz_questions", renderer="json")
def get_quiz_questions(request):

    filters = {}

    difficulty = request.params.get("difficulty")
    if difficulty:
        filters["difficulty"] = int(difficulty)

    seasons = request.params.get("seasons")
    if seasons:
        filters["seasons"] = [int(i) for i in seasons.split(",")]

    questions = api.get_questions(**filters)
    potential_questions = [q.to_dict() for q in questions]

    question_count = len(potential_questions)
    if question_count < QUESTIONS_TO_RETURN:
        LOG.warn("Only returning %d question(s). Goal was %d. Filters: %r",
                 question_count, QUESTIONS_TO_RETURN, filters)
    else:
        potential_questions = potential_questions[:QUESTIONS_TO_RETURN]

    random.shuffle(potential_questions)
    return potential_questions
