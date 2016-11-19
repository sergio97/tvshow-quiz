import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.md')).read()

requires = [
    'pyramid',
    'sqlalchemy',
    'sqlalchemy-migrate',
    'zope.sqlalchemy',
    'pyramid_tm',
    'uwsgi',
    'schema',
]

extras_require = {
    'testing': [
        'coverage',
    ],
}

setup(
    name='questionmaster',
    version='0.1',
    description='questionmaster',
    long_description=README,
    author='Sergio Martins',
    author_email='',
    url='',
    license='Apache v2',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    test_suite='questionmaster',
    install_requires=requires,
    extras_require=extras_require,
    entry_points="""\
        [paste.app_factory]
        main = questionmaster:main
    """,
)
