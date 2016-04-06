var React = require('react');
var Answer = require('./Answer.jsx')
var QuizPager = require('./QuizPager.jsx')


var QuestionBody = React.createClass({
  render: function() {
    var options = this.props.question_data.options;
    var current_answer = this.props.question_data.current_answer;

    var option_components = options.map(function(option, index) {
      return (
          <Answer key={index}
                  text={option.text}
                  current_answer={current_answer} />
      )
    });

    return (
      <div>
        <p>
          {this.props.question_data.text}
        </p>
        <form>
          {option_components}
        </form>
        <QuizPager />
      </div>
    );
  }
});

module.exports = QuestionBody
