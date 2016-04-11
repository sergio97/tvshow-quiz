var React = require('react');

var QuestionStore = require('../stores/QuestionStore')
var ProgressBar = require('react-bootstrap/lib/ProgressBar')


var QuizProgress = React.createClass({
  render: function() {
    var question_number = QuestionStore.getQuestionNumber();
    var question_count = QuestionStore.getQuestionCount();
    var percentage = question_number / question_count;
    var label = `${question_number} of ${question_count}`;
    return (
      <ProgressBar now={percentage * 100} label={label} />
    );
  }
});

module.exports = QuizProgress;
