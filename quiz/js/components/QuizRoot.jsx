var React = require('react');

var QuizStore = require('../stores/QuizStore');

var QuizWelcome = require('./QuizWelcome.jsx');
var QuizScore = require('./QuizScore.jsx');
var QuizHeader = require('./QuizHeader.jsx');
var QuestionBody = require('./QuestionBody.jsx');
var QuizTrailer = require('./QuizTrailer.jsx');


var QuizRoot = React.createClass({
  mixins: [QuizStore.mixin],
  getInitialState: function() {
      return {
        quiz_state: QuizStore.getQuizState()
      };
  },
  storeDidChange: function() {
    this.setState({
      quiz_state: QuizStore.getQuizState()
    })
  },
  getComponentsForState: function(state) {
    if (state === 'init') {
      return (
        <QuizWelcome />
      );
    } else if (state === 'loading') {
      return (
        <h2>Loading...</h2>
      );
    } else if (state === 'in-progress') {
      return (
        <div>
          <QuestionBody />
          <QuizTrailer />
        </div>
      );
    } else if (state === 'finished') {
      return (
        <QuizScore />
      );
    } else {
      throw 'Invalid state: ' + state;
    }
  },
  render: function() {
    var components = this.getComponentsForState(this.state.quiz_state);

    return (
      <div className="container">
        <QuizHeader />
        {components}
      </div>
    );
  }
});


module.exports = QuizRoot;
