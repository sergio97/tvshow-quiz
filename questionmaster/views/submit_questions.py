import random
import logging

from schema import Use
from schema import And
from schema import Schema
from schema import Optional

from pyramid.view import view_config

from questionmaster.database import api


LOG = logging.getLogger(__name__)
ANSWER_FORMATS = (
    "mc_single",
    "mc_multi",
    "str_exact",
    "str_regex",
)
QUESTION_FORMATS = (
    "identify_episode",
    "identify_character",
    "identify_prop",
    "identify_dialog",
    "fillin_dialog",
)
CONFLICT_DOMAINS = ()


question_schema = Schema({
    "text": And(str, len),
    "hint": And(str, len),
    "options": And((str, list), len), # TODO
    "answer_format": (lambda s: s in ANSWER_FORMATS),
    "answer": And(str, len),
    "difficulty": And(int, (lambda x: 1 <= x <= 10)),
    "author": And(str, len),
    "episode": And(str, len), # TODO
    "question_format": And(str, (lambda s: s in QUESTION_FORMATS)),
    # TODO: conflict_domains
})



@view_config(route_name="get_create_question_data", renderer="json")
def get_create_question_data(request):
    return {
        "answer_formats": ANSWER_FORMATS,
        "question_formats": QUESTION_FORMATS,
        "conflict_domains": CONFLICT_DOMAINS,
    }

@view_config(route_name="submit_question")
def submit_question(request):
    raise NotImplementedError
