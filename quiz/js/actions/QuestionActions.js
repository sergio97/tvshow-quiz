var mcFly = require('../core/mcFly');

var QuestionActions = mcFly.createActions({
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
