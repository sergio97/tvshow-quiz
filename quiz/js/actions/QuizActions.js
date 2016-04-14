var mcFly = require('../core/mcFly');

var QuizActions = mcFly.createActions({
    loadQuiz: function(quiz_config) {
      return {
        actionType: 'LOAD_QUIZ',
        quiz_config: quiz_config,
      };
    },
    startQuiz: function() {
      return {
        actionType: 'START_QUIZ',
      };
    },
    submitQuiz: function(question_data) {
      return {
        actionType: 'SUBMIT_QUIZ',
        question_data: question_data,
      };
    },
});

module.exports = QuizActions;
