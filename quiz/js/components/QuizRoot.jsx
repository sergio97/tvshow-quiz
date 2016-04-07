var React = require('react');

var QuestionStore = require('../stores/QuestionStore');
var QuizHeader = require('../components/QuizHeader.jsx')
var MCSingleQuestion = require('../components/MCSingleQuestion.jsx')
var QuizTrailer = require('../components/QuizTrailer.jsx')


var QuizRoot = React.createClass({
  mixins: [QuestionStore.mixin],
  getInitialState: function(){
      console.log('getInitialState()');
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
    return (
      <div className="container">
        <QuizHeader />
        <MCSingleQuestion question_data={this.state.question} />
        <QuizTrailer />
      </div>
    );
  }
});


module.exports = QuizRoot;
