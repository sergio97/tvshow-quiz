var React = require('react');

var QuestionStore = require('../stores/QuestionStore');
var QuizPager = require('./QuizPager.jsx');
var QuizProgress = require('../components/QuizProgress.jsx');


function getAnswerClass(answer_format) {
  switch (answer_format) {
    case 'mc_single':
      return require('./MCSingleAnswer.jsx');
    case 'mc_multi':
      return require('./MCMultiAnswer.jsx');
    // case 'truefalse':
    //   return require('./TrueFalseAnswer.jsx');
    case 'str_exact':
      return require('./StrExactAnswer.jsx');
    default:
      throw 'Unknown answer format: ' + answer_format;
  }
}


var QuestionBody = React.createClass({
  mixins: [QuestionStore.mixin],
  getInitialState: function(){
      return {
        question: QuestionStore.getCurrentQuestion(),
      };
  },
  storeDidChange: function() {
      this.setState({
        question: QuestionStore.getCurrentQuestion(),
      });
  },
  render: function() {
    var question_data = this.state.question;
    var answer_format = question_data.answer_format;
    var answer_class = getAnswerClass(answer_format);
    var answer_component = React.createElement(answer_class, {
      'question_data': question_data
    });

    return (
      <div>
        <p>
          {question_data.text}
        </p>
        {answer_component}
        <QuizPager />
        <p>
          &nbsp;
        </p>
        <QuizProgress />
      </div>
    );
  }
});

module.exports = QuestionBody;
