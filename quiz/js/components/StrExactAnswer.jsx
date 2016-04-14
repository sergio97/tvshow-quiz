var React = require('react');
var QuestionActions = require('../actions/QuestionActions');


var StrExactAnswer = React.createClass({
  onChangeHandler: function() {
    QuestionActions.setAnswer(this.refs.input.value);
  },
  render: function() {
    return (
      <div>
        <input type="text"
               value={this.props.question_data.current_answer}
               ref="input"
               label="type your answer here"
               onChange={this.onChangeHandler} />
      </div>
    );
  }
});

module.exports = StrExactAnswer
