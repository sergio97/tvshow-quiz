var Flux = require('../core/mcFly');

var QuestionActions = Flux.createActions({
    setAnswer: function(text){
      return {
        actionType: 'SET_ANSWER',
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
    submit: function(){
      return {
        actionType: 'SUBMIT',
      }
    },
});

module.exports = QuestionActions;
