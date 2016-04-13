var mcFly = require('../core/mcFly');

var QuestionActions = mcFly.createActions({
    initializeQuestions: function(question_data) {
      console.log('Initializing questions:', question_data);
      return {
        actionType: 'INITIALIZE_QUESTIONS',
        question_data: question_data,
      }
    },
    setAnswer: function(text){
      return {
        actionType: 'SET_ANSWER',
        text: text
      }
    },
    toggleAnswer: function(text){
      return {
        actionType: 'TOGGLE_ANSWER',
        text: text
      }
    },
    nextQuestion: function() {
      return {
        actionType: 'NEXT_QUESTION',
      }
    },
    prevQuestion: function() {
      return {
        actionType: 'PREV_QUESTION',
      }
    },
    reset: function(){
      return {
        actionType: 'RESET',
      }
    },
});

module.exports = QuestionActions;
