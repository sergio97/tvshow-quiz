var React = require('react');
var Pager = require('react-bootstrap/lib/Pager');
var PageItem = require('react-bootstrap/lib/PageItem');

var QuestionActions = require('../actions/QuestionActions')
var QuestionStore = require('../stores/QuestionStore')
var QuizActions = require('../actions/QuizActions');


var QuizPager = React.createClass({
  onClickPrev: function() {
    QuestionActions.prevQuestion();
  },
  onClickNext: function() {
    QuestionActions.nextQuestion();
  },
  onClickReset: function() {
    QuestionActions.reset();
  },
  onClickSubmit: function() {
    QuizActions.submitQuiz(QuestionStore.getQuestionsForSubmit());
  },
  render: function() {
    var last_button;
    if (QuestionStore.isLastQuestion()) {
      last_button = (
        <PageItem href="#"
                  onClick={this.onClickSubmit}
                  disabled={false}>Finish</PageItem>
      );
    } else {
      last_button = (
        <PageItem href="#"
                  onClick={this.onClickNext}
                  disabled={false}>Next &rarr;</PageItem>
      );
    }

    return (
      <div>
        <Pager>
          <PageItem href="#"
                    onClick={this.onClickPrev}
                    disabled={QuestionStore.isFirstQuestion()}>&larr; Previous</PageItem>
          <PageItem href="#"
                    onClick={this.onClickReset}
                    disabled={false}>Clear Answer</PageItem>
          {last_button}
        </Pager>
      </div>
    );
  },
});

module.exports = QuizPager;
