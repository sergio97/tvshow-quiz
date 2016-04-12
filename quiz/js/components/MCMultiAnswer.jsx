var React = require('react');
var QuestionActions = require('../actions/QuestionActions');


var MCAnswer = React.createClass({
  onClickHandler: function() {
    QuestionActions.toggleAnswer(this.props.text);
  },
  getChecked: function() {
    return this.props.current_answers.indexOf(this.props.text) !== -1;
  },
  render: function() {
    return (
      <div>
        <input type="checkbox"
               checked={this.getChecked()}
               onChange={this.onClickHandler} />
        <label onClick={this.onClickHandler}> {this.props.text}</label>
      </div>
    );
  }
});

var MCMultiAnswer = React.createClass({
  render: function() {
    var options = this.props.question_data.options;
    var current_answers = this.props.question_data.current_answers;

    var option_components = options.map(function(option, index) {
      return (
          <MCAnswer key={index}
                    text={option.text}
                    current_answers={current_answers} />
      )
    });

    return (
      <div>
          {option_components}
      </div>
    );
  }
});

module.exports = MCMultiAnswer
