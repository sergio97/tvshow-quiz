var React = require('react');

var QuizHeader = require('../components/QuizHeader.jsx');
var QuestionBody = require('../components/QuestionBody.jsx');
var QuizTrailer = require('../components/QuizTrailer.jsx');


var QuizRoot = React.createClass({
  getInitialState: function(){
      return {
        quiz_started: true,
        quiz_ended: false,
      };
  },
  render: function() {
    return (
      <div className="container">
        <QuizHeader />
        <QuestionBody />
        <QuizTrailer />
      </div>
    );
  }
});


module.exports = QuizRoot;
