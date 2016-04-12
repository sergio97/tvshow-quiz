var React = require('react');

var Button = require('react-bootstrap/lib/Button');

var QuizActions = require('../actions/QuizActions');


var QuizWelcome = React.createClass({
  onClickHandler: function() {
    QuizActions.startQuiz();
  },
  render: function() {
    return (
      <div>
        <h3>Click below to get started</h3>
        <p>
          &nbsp;
        </p>
        <Button bsStyle="success" onClick={this.onClickHandler}>started</Button>
      </div>
    );
  }
});


module.exports = QuizWelcome;
