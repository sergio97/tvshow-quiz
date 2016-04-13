var React = require('react');

var QuizGrader = require('../core/QuizGrader');
var QuizStore = require('../stores/QuizStore');

var QuizWelcome = React.createClass({
  render: function() {

    var question_data = QuizStore.getQuizQuestionsForMarking();
    var results = QuizGrader.gradeQuiz(question_data);
    var answer_components = results.answers.map(function(answer, index){
      return (
        <p key={index}>
          {answer}
        </p>
      );
    });

    return (
      <div>
        <h4>Score:</h4>
        <h2>{results.score}</h2>
        <p>
          &nbsp;
        </p>
        {answer_components}
      </div>
    );
  }
});


module.exports = QuizWelcome;
