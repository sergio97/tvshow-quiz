var mcFly = require('../core/mcFly');

var quizGrader = require('../core/quizGrader');
var questionLoader = require('../core/questionLoader');
var QuestionActions = require('../actions/QuestionActions');
var QuizActions = require('../actions/QuizActions');

var _quiz_state = 'init';
var _quiz_results = null;



var QuizStore = mcFly.createStore(
  {
    getQuizState: function() {
      return _quiz_state;
    },
    getQuizResults: function() {
      return _quiz_results;
    }
  },
  function(payload){
    var payload_action = payload.actionType;
    if (payload_action === 'LOAD_QUIZ') {
      var quiz_config = payload_action.quiz_config;
      _quiz_state =  'loading';
      var questions = questionLoader.loadQuestions();
      QuestionActions.initializeQuestions(questions);
      QuizActions.startQuiz()
    } else if (payload_action === 'START_QUIZ') {
      _quiz_state = 'in-progress';
    } else if (payload_action === 'SUBMIT_QUIZ') {
      _quiz_results = quizGrader.gradeQuiz(payload.question_data);
      _quiz_state = 'finished';
    }

    QuizStore.emitChange();
  }
);

module.exports = QuizStore;
