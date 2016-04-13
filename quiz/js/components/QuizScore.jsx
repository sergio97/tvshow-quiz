var React = require('react');

var Button = require('react-bootstrap/lib/Button');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

var QuizGrader = require('../core/QuizGrader');
var QuizStore = require('../stores/QuizStore');

const correctness_style_map = {
  'correct': 'success',
  'partial': 'warning',
  'incorrect': 'danger',
};

var QuizWelcome = React.createClass({
  getInitialState: function() {
      return {
          answers_visible: false,
      };
  },
  toggleAnswersVisible: function() {
    this.setState({
      answers_visible: !this.state.answers_visible,
    })
  },
  render: function() {

    var question_data = QuizStore.getQuizQuestionsForMarking();
    var results = QuizGrader.gradeQuiz(question_data);
    var answer_components = results.answers.map(function(answer, index){
      let style = correctness_style_map[answer.correctness];
      return (
        <ListGroupItem key={index}
                       bsStyle={style}>
          {answer.text}
        </ListGroupItem>
      );
    });

    var answers_section;
    if (!this.state.answers_visible) {
      answers_section = (
        <div>
        <p>
          <Button onClick={this.toggleAnswersVisible}>
            Show Details
          </Button>
        </p>
        </div>
      );
    } else {
      answers_section = (
        <div>
        <p>
          <Button onClick={this.toggleAnswersVisible}>
            Hide Details
          </Button>
        </p>
          <ListGroup>
            {answer_components}
          </ListGroup>
        </div>
      );
    }

    return (
      <div>
        <h4>Final Score:</h4>
        <h1>{results.score}</h1>
        <p>
          &nbsp;
        </p>
        {answers_section}
      </div>
    );
  }
});


module.exports = QuizWelcome;
