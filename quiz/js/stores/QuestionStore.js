var mcFly = require('../core/mcFly');


var _current_question_index = 0;
var _questions = [
  {
    text: 'Which numbers are primary?',
    hint: 'Remember: integers only!',
    answer_format: 'mc_multi',
    options: [
      {'text': '2'},
      {'text': '9'},
      {'text': '17'},
      {'text': '1729'},
    ],
    answers: ['2', '17'],
    difficulty: 5,
    current_answers: [],
  },
  {
    text: 'Which character is a father',
    hint: 'A father is a male who has offspring',
    answer_format: 'mc_single',
    options: [
      {'text': 'The Mom'},
      {'text': 'The Dad'},
      {'text': 'The Daughter'},
      {'text': 'The Son'},
      {'text': 'The Dog'},
    ],
    answer: 'The Dad',
    difficulty: 2,
    current_answer: '',
  },
];


function setCurrentAnswer(text) {
  _questions[_current_question_index].current_answer = text;
}

function toggleAnswer(text) {
  var current_answers = _questions[_current_question_index].current_answers;
  var index = current_answers.indexOf(text);
  if (index === -1) {
    current_answers.push(text);
  } else {
    current_answers.splice(index, 1);
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
    if (payload_action === 'SET_ANSWER') {
      setCurrentAnswer(payload.text);
      update_required = true;
    } else if (payload_action === 'RESET') {
      var current_question = _questions[_current_question_index];
      if (current_question.current_answers) {
        console.log('resetting MULTI question');
        current_question.current_answers = [];
      } else {
        console.log('resetting SINGLE question');
        setCurrentAnswer('');
      }
      update_required = true;
    } else if (payload_action === 'TOGGLE_ANSWER') {
      toggleAnswer(payload.text);
      update_required = true;
    } else if (payload_action === 'NEXT_QUESTION') {
      if (_questions[_current_question_index + 1] === undefined) {
        // console.log('NEXT_QUESTOIN fired but already on final question');
      } else {
        _current_question_index += 1;
        update_required = true;
      }
    } else if (payload_action === 'PREV_QUESTION') {
      if (_current_question_index === 0) {
        // console.log('PREV_QUESTION fired but already on first question');
      } else {
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
