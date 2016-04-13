const difficulty_score_map = {
  1: 1.0,
  2: 1.41,
  3: 1.73,
  4: 2.24,
  5: 2.83,
  6: 3.6,
  7: 4.58,
  8: 5.83,
  9: 7.42,
  10: 9.43,
};
const final_score_multiplier = 100;

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
  var total_score = 0;
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

    let difficulty_multiplier = difficulty_score_map[question.difficulty];
    let weighted_score = Math.max(correct, 0) * difficulty_multiplier;
    total_score += weighted_score;

    // console.log('correctness:', parseFloat(correct));
    let display_index = index + 1;
    if (correct === 1) {
      answers.push('Answer ' + display_index + ' was correct');
    } else if ( 0 < correct && correct < 1) {
      answers.push('Answer ' + display_index + ' was partially correct');
    } else {
      answers.push('Answer ' + display_index + ' was wrong');
    }
  }

  total_score *= final_score_multiplier;

  var result = {
    score: total_score,
    answers: answers,
  }

  return result;
};

module.exports = {gradeQuiz: gradeQuiz};
