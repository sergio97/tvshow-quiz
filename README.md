This is early work-in-progress. Expect rough edges


Installation
============

1. Install Node.js and npm `sudo apt-get install npm`
1. Download the packages needed by this project `npm install`
1. Set up an alias for webpack `echo alias webpack="nodejs node_modules/webpack/bin/webpack.js" >> ~/.bashrc`. If you don't want to do this, see the alternative install section below.
1. Reload .bashrc `source ~/.bashrc`


Usage
=====

1. Transform/bundle all the stuff `webpack`
1. This should produce a `dist` directory. Now open dist/index.html in your browser


Alternative Installation/Usage
==============================

If you don't want to add an alias for webpack, do 1 of these instead:

* Install webpack globally `sudo apt-get install nodejs-legacy && sudo npm install webpack -g`
* Run the full command each time`nodejs node_modules/webpack/bin/webpack.js`


Authors
=======

Sergio Martins <sergio97@gmail.com>

