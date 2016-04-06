var Flux = require('../core/mcFly');


var _current_question_index = 0;
var _questions = [
  {
    text: 'Which number is primary?',
    hint: 'Remember: integers only!',
    question_type: 'mc_single',
    options: [
      {'text': '15'},
      {'text': '17'},
      {'text': '21'},
      {'text': '1729'},
    ],
    answer: '17',
    current_answer: '',
  },
  {
    text: 'Which character is a father',
    hint: 'A father is a male who has offspring',
    question_type: 'mc_single',
    options: [
      {'text': 'The Mom'},
      {'text': 'The Dad'},
      {'text': 'The Daughter'},
      {'text': 'The Son'},
      {'text': 'The Dog'},
    ],
    answer: 'The Dad',
    current_answer: '',
  },
];



function setCurrentAnswer(text) {
  console.log('Setting current answer to:', text);
  _questions[_current_question_index].current_answer = text;
}

function calculateScore(questions) {
  var result = [];
  for (let question of questions) {
    if (question.answer == question.current_answer) {
      result.push('Answer ' + questions.indexOf(question) + ' was correct!')
    } else {
      result.push('Answer ' + questions.indexOf(question) + ' was wrong')
    }
  }
  return result;
}

var QuestionStore = Flux.createStore(
  {
    getCurrentQuestion: function() {
      return _questions[_current_question_index];
    },
  },
  function(payload){
    var update_required = false;
    var payload_action = payload.actionType
    if (payload_action === 'SET_ANSWER') {
      setCurrentAnswer(payload.text);
      update_required = true;
    } else if (payload_action === 'RESET') {
      setCurrentAnswer('');
      update_required = true;
    } else if (payload_action === 'NEXT_QUESTION') {
      if (_questions[_current_question_index + 1] === undefined) {
        console.log('NEXT_QUESTOIN fired but already on final question');
      } else {
        _current_question_index += 1;
        update_required = true;
      }
    } else if (payload_action === 'PREV_QUESTION') {
      if (_current_question_index === 0) {
        console.log('PREV_QUESTION fired but already on first question');
      } else {
        _current_question_index -= 1;
        update_required = true;
      }
    } else if (payload_action === 'SUBMIT') {
      var result = calculateScore(_questions);
      console.log(result);
      alert(result.join('\n'));
    }


    if (update_required) {
      QuestionStore.emitChange();
    }
  }
);

module.exports = QuestionStore;
