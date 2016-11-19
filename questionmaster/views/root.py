import logging

from pyramid.view import view_config


LOG = logging.getLogger(__name__)


@view_config(route_name='root', renderer='string')
def root(request):
    return 'Hi there!'
