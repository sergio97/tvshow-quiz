var React = require('react');
var QuestionActions = require('../actions/QuestionActions');


var MCAnswer = React.createClass({
  onClickHandler: function() {
    QuestionActions.setAnswer(this.props.text);
  },
  getChecked: function() {
    // console.log("We're checking:", this.props.text, this.props.current_answer);
    return this.props.text == this.props.current_answer;
  },
  render: function() {
    return (
      <div>
        <input type="radio"
               checked={this.getChecked()}
               onChange={this.onClickHandler} />
        <label onClick={this.onClickHandler}> {this.props.text}</label>
      </div>
    );
  },
});

var AnswerMCSingle = React.createClass({
  render: function() {
    var options = this.props.question_data.options;
    var current_answer = this.props.question_data.current_answer;

    var option_components = options.map(function(option, index) {
      return (
          <MCAnswer key={index}
                    text={option.text}
                    current_answer={current_answer} />
      )
    });

    return (
      <div>
          {option_components}
      </div>
    );
  },
});

module.exports = AnswerMCSingle
