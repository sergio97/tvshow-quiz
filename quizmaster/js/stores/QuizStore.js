var mcFly = require('../core/mcFly');

var quizGrader = require('../core/quizGrader');
var questionLoader = require('../core/questionLoader');
var QuestionActions = require('../actions/QuestionActions');
var QuizActions = require('../actions/QuizActions');

var _quiz_state = 'init';
var _quiz_results = null;


function _loadQuestionsCallback(data, textStatus) {
  console.log('Status from server:', textStatus);
  console.log('Server Response:', data);

  // Inject 'current_answer' for each question
  for (let question of data) {
    if (question.answer_format === 'mc_multi') {
      question.current_answer = [];
    } else {
      question.current_answer = '';
    }
  }

  QuestionActions.initializeQuestions(data);
  QuizActions.startQuiz();
}


var QuizStore = mcFly.createStore(
  {
    getQuizState: function() {
      return _quiz_state;
    },
    getQuizResults: function() {
      return _quiz_results;
    },
  },
  function(payload){
    var payload_action = payload.actionType;
    if (payload_action === 'LOAD_QUIZ') {
      var quiz_config = payload.quiz_config;
      _quiz_state =  'loading';
      questionLoader.loadQuestions(quiz_config, _loadQuestionsCallback);
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
