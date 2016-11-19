import logging

from pyramid.httpexceptions import HTTPInternalServerError


LOG = logging.getLogger(__name__)


def api(func):
    """ Decorator for all APIs """
    def api_wrapper(request):
        try:
            return func(request)
        except Exception:
            LOG.exception("Exception during API call:")
            return HTTPInternalServerError("Something bad happened :(")
