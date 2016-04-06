var React = require('react');

var QuestionStore = require('../stores/QuestionStore.jsx');
var QuizHeader = require('../components/QuizHeader.jsx')
var QuestionBody = require('../components/QuestionBody.jsx')
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
      console.log('StoreDidChange()');
      this.setState({
        question: QuestionStore.getCurrentQuestion(),
      });
  },
  render: function() {
    return (
      <div className="container">
        <QuizHeader />
        <QuestionBody question_data={this.state.question} />
        <QuizTrailer />
      </div>
    );
  }
});


module.exports = QuizRoot;
