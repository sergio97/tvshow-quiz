import uuid
import json
import logging
from datetime import datetime

from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from questionmaster.database.model_base import ModelBase


LOG = logging.getLogger(__name__)


class Question(ModelBase):
    __tablename__ = 'question'

    id = Column(String(255), primary_key=True)
    added = Column(DateTime, nullable=False)
    text = Column(Text, nullable=False)
    hint = Column(Text, nullable=False)
    options = Column(Text)
    answer_format = Column(String(255), nullable=False)
    answer = Column(String(255), nullable=False)
    difficulty = Column(Integer, nullable=False)
    author = Column(String(255), nullable=False)
    episode = Column(String(255))
    question_format = Column(String(255))
    conflict_domains = Column(Text)

    def __init__(self, text, answer_format, answer, difficulty, author,
                 id=None, hint=None, options=None, episode=None,
                 question_format=None, conflict_domains=None):
        self.id = id or str(uuid.uuid4()).split("-")[0]
        self.added = datetime.utcnow()
        self.text = text
        self.hint = hint or ''
        self.options = json.dumps(options)
        self.answer_format = answer_format
        # multi-answer questions will have list answers, others are strings
        self.answer = json.dumps(answer)
        self.difficulty = difficulty
        self.author = author
        self.episode = episode
        self.question_format = question_format
        self.conflict_domains = json.dumps(conflict_domains)

    def __repr__(self):
        return "<%s with ID %s>" % (self.__class__.__name__, self.id)

    def to_dict(self):
        ret = {}
        ret["id"] = self.id
        ret["added"] = str(self.added)
        ret["text"] = self.text
        ret["hint"] = self.hint
        ret["options"] = json.loads(self.options)
        ret["answer_format"] = self.answer_format
        ret["answer"] = json.loads(self.answer)
        ret["difficulty"] = self.difficulty
        ret["author"] = self.author
        return ret

    def to_dict_full(self):
        ret = self.to_json()
        ret['episode'] = episode
        ret['question_format'] = question_format
        ret['conflict_domains'] = json.loads(conflict_domains)
        return ret
