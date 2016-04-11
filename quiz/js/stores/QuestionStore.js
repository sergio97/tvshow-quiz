var Flux = require('../core/mcFly');


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
    current_answer: '',
  },
];


function setCurrentAnswer(text) {
  console.log('Setting current answer to:', text);
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

function markQuiz(questions) {
  var result = [];
  for (let index in questions) {
    let question = questions[index];
    let correct;
    if (question.current_answer !== undefined) {
      correct = _markSingleQuestion(question);
    } else if (question.current_answers !== undefined) {
      correct = _markMultiQuestion(question);
    } else {
      throw "Unable to mark this question:" + question;
    }

    console.log('correctness:', parseFloat(correct));
    if (correct === 1) {
      result.push('Answer ' + index + ' was correct!');
    } else if ( 0 < correct && correct < 1) {
      result.push('Answer ' + index + ' was partially correct');
    } else {
      result.push('Answer ' + index + ' was wrong');
    }
  }
  return result;
}

function _markSingleQuestion(question) {
  // console.log('Marking single question:', question);
  if (question.answer == question.current_answer) {
    return 1;
  }
  return 0;
}

function _markMultiQuestion(question) {
  let result = 0;
  let answers = question.answers;
  for (let current_answer of question.current_answers) {
    if (answers.indexOf(current_answer) !== -1) {
      result += (1 / answers.length);
    } else {
      result -= (1 / answers.length);
    }
  }
  return result;
}

var QuestionStore = Flux.createStore(
  {
    getCurrentQuestion: function() {
      return _questions[_current_question_index];
    },
    getQuestionsCount: function() {
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
    }
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
    } else if (payload_action === 'SUBMIT') {
      var result = markQuiz(_questions);
      alert(result.join('\n'));
    }


    if (update_required) {
      QuestionStore.emitChange();
    }
  }
);

module.exports = QuestionStore;
