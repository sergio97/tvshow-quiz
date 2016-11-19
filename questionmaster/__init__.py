import logging

from pyramid.renderers import JSON
from pyramid.config import Configurator

from questionmaster import database as db


LOG = logging.getLogger(__name__)


def main(global_config, **settings):

    # Initialize database connection and schema
    db_connection_string = settings.get("connection_sring",
                                        "sqlite:///db.sqlite")
    db.initialize(db_connection_string)

    config = Configurator(settings=settings)

    # Automatically commit db transaction on 2xx/3xx response and rollback
    # transaction on 4xx/5xx response or when an exception is raised
    config.include('pyramid_tm')

    # make JSON pretty
    config.add_renderer('json', JSON(indent=4))

    # Routes
    config.add_route('root', '/api', request_method='GET')
    config.add_route('get_quiz_questions', '/api/question', request_method='GET')
    config.add_route('get_create_question_data', '/api/submit', request_method='GET')
    config.add_route('submit_question', '/api/submit', request_method='POST')

    # Views
    config.scan('questionmaster.views');

    # Static content
    config.add_static_view("", "static")

    return config.make_wsgi_app()
