function _markSingleQuestion(question) {
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

function gradeQuiz(questions) {
  var answers = [];
  for (let index in questions) {
    index = parseInt(index); // Index is a string, really?
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
    let display_index = index + 1;
    if (correct === 1) {
      answers.push('Answer ' + display_index + ' was correct!');
    } else if ( 0 < correct && correct < 1) {
      answers.push('Answer ' + display_index + ' was partially correct');
    } else {
      answers.push('Answer ' + display_index + ' was wrong');
    }
  }

  var result = {
    answers: answers,
  }

  return result;
};

module.exports = {gradeQuiz: gradeQuiz};
