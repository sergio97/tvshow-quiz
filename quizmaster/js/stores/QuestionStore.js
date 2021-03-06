var mcFly = require('../core/mcFly');


var _current_question_index = null;
var _questions = null;


function setCurrentAnswer(text) {
  _questions[_current_question_index].current_answer = text;
}

function toggleAnswer(text) {
  var current_answers = _questions[_current_question_index].current_answer;
  var index = current_answers.indexOf(text);
  if (index === -1) {
    current_answers.push(text);
  } else {
    current_answers.splice(index, 1);
  }
}

function resetAnswer() {
  var current_question = _questions[_current_question_index];
  if (current_question.answer_format === 'mc_multi') {
    current_question.current_answer = [];
  } else {
    setCurrentAnswer('');
  }
}

var QuestionStore = mcFly.createStore(
  {
    getCurrentQuestion: function() {
      return _questions[_current_question_index];
    },
    getQuestionCount: function() {
      return _questions.length;
    },
    getQuestionNumber: function() {
      return _current_question_index + 1;
    },
    isFirstQuestion: function() {
      return _current_question_index === 0;
    },
    isLastQuestion: function() {
      return _current_question_index === _questions.length - 1;
    },
    getQuestionsForSubmit: function() {
      return _questions;
    },
  },
  function(payload){
    var update_required = false;
    var payload_action = payload.actionType;
    if (payload_action === 'INITIALIZE_QUESTIONS') {
      _questions = payload.question_data;
      _current_question_index = 0;
    } else if (payload_action === 'SET_ANSWER') {
      setCurrentAnswer(payload.text);
      update_required = true;
    } else if (payload_action === 'RESET') {
      resetAnswer();
      update_required = true;
    } else if (payload_action === 'TOGGLE_ANSWER') {
      toggleAnswer(payload.text);
      update_required = true;
    } else if (payload_action === 'NEXT_QUESTION') {
      if (_questions[_current_question_index + 1] !== undefined) {
        _current_question_index += 1;
        update_required = true;
      }
    } else if (payload_action === 'PREV_QUESTION') {
      if (_current_question_index !== 0) {
        _current_question_index -= 1;
        update_required = true;
      }
    }

    if (update_required) {
      QuestionStore.emitChange();
    }
  }
);

module.exports = QuestionStore;
