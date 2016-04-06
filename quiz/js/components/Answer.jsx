var React = require('react');
var QuestionActions = require('../actions/QuestionActions.jsx')


var Answer = React.createClass({
  onClickHandler: function() {
    QuestionActions.setAnswer(this.props.text);
  },
  getChecked: function() {
    console.log("We're checking:", this.props.text, this.props.current_answer); // eslint-disable-line quotes
    return this.props.text == this.props.current_answer;
  },
  render: function() {
    return (
      <div>
        <input type="radio"
               checked={this.getChecked()}
               value={this.props.text} //not actually needed
               onClick={this.onClickHandler} />
        <label> {this.props.text}</label>
      </div>
    );
  }
});

module.exports = Answer;
