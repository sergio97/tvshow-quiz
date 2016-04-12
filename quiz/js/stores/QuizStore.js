var mcFly = require('../core/mcFly');

var _quiz_state = "init";
var _quiz_questions_for_marking = null;

var QuizStore = mcFly.createStore(
  {
    getQuizState: function() {
      return _quiz_state;
    },
    getQuizQuestionsForMarking: function() {
      return _quiz_questions_for_marking;
    }
  },
  function(payload){
    var payload_action = payload.actionType;
    if (payload_action === 'START_QUIZ') {
      console.log("Start quiz");
      _quiz_state = "in-progress";
    } else if (payload_action === 'SUBMIT_QUIZ') {
      console.log("Submit quiz");
      _quiz_state = "finished";
      _quiz_questions_for_marking = payload.question_data;
    }

    QuizStore.emitChange();
  }
);

module.exports = QuizStore;
