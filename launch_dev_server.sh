#! /bin/bash

source ./venv/bin/activate

# this starts the uwsgi web server, but also does whatever the .ini file
# tells it to do (ie. create a socket)
./venv/bin/uwsgi --ini-paste development.ini --py-auto-reload 1 --http 127.0.0.1:8000

