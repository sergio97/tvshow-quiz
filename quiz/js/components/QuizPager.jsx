var React = require('react');
var Pager = require('react-bootstrap/lib/Pager');
var PageItem = require('react-bootstrap/lib/PageItem');

var QuestionActions = require('../actions/QuestionActions')
var QuestionStore = require('../stores/QuestionStore')


var QuizPager = React.createClass({
  render: function() {
    var prev_disabled = QuestionStore.isFirstQuestion();
    console.log('prev_disabled', prev_disabled);
    return (
      <div>
        <Pager>
          <PageItem href="#" onClick={QuestionActions.prevQuestion}>&larr; Previous</PageItem>
          <PageItem href="#" onClick={QuestionActions.reset}>Clear Answer</PageItem>
          <PageItem href="#" onClick={QuestionActions.submit}>Finish</PageItem>
          <PageItem href="#" onClick={QuestionActions.nextQuestion}>Next &rarr;</PageItem>
        </Pager>
      </div>
    );
  }
});

module.exports = QuizPager;
