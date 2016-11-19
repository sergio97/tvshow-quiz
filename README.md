This is early work-in-progress. Expect rough edges

This repo contains 2 projects:
* QuestionMaster lets you manage and access a collection of quiz questions stored in a database
* QuizMaster is a web application for displaying quiz questions and scoring the user's answers


QuizMaster Installation
=======================

1. Install Node.js and npm `sudo apt-get install npm`
1. Download the packages needed by this project `npm install`


QuestionMaster Installation
===========================

1. Install python3-dev and pyvenv `sudo apt-get install python3-dev python3-venv`
1. Create a virtualenv and activate it `pyvenv venv; source venv/bin/activate`
1. Install deps `python setup.py install`


QuizMaster Usage
================

1. Transform/bundle all the stuff `npm run-script webpack`
1. This generates all the HTML/CSS/JS files that QuestionMaster can now host


QuestionMaster Usage
====================

1. `./launch_dev_server.sh`
1. open your browser to 127.0.0.1:8000


Authors
=======

Sergio Martins
