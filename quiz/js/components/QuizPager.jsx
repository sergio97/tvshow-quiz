var React = require('react');
var QuestionActions = require('../actions/QuestionActions.jsx')


var QuizPager = React.createClass({
  render: function() {
    return (
      <div>
        <ul className="pager">
          <li className="previous">
            <a href="#" onClick={QuestionActions.prevQuestion}>&larr; Previous</a>
          </li>
          <li className="next">
            <a href="#" onClick={QuestionActions.nextQuestion}>Next &rarr;</a>
          </li>
          <li className="">
            <a href="#" onClick={QuestionActions.reset}>Clear Answer</a>
          </li>
          <li className="submit">
            <a href="#" onClick={QuestionActions.submit}>Submit</a>
          </li>
        </ul>
      </div>
    );
  }
});


module.exports = QuizPager;
