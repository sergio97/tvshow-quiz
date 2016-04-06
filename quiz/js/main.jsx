// babel translates <QuizRoot /> into React.createElement(),
// but it doesn't require() React, so we have to include it:
var React = require('react');

var ReactDOM = require('react-dom');
var QuizRoot = require('./components/QuizRoot.jsx');

ReactDOM.render(<QuizRoot />,
  document.getElementById('container')
);
