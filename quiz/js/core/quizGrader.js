const difficulty_multiplier = {
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

function _gradeSingleQuestion(question) {
  if (question.answer == question.current_answer) {
    return 1;
  }
  return 0;
}

function _gradeMultiQuestion(question) {
  let result = 0;
  let answers = question.answers;
  for (let current_answer of question.current_answers) {
    if (answers.indexOf(current_answer) !== -1) {
      result += (1 / answers.length);
    } else {
      result -= (1 / answers.length);
    }
  }
  return Math.max(result, 0);
}

function _gradeStrExactQuestion(question) {
  if (question.answer == question.current_answer) {
    return 1;
  }
  return 0;
}

function _gradeQuestion(question) {
  switch(question.answer_format) {
    case 'mc_single':
      return _gradeSingleQuestion(question);
    case 'mc_multi':
      return _gradeMultiQuestion(question);
    case 'str_exact':
      return _gradeStrExactQuestion(question);
    default:
      throw 'Unknown answer format:' + question.answer_format;
  }
}

function gradeQuiz(questions) {
  var answers = [];
  var total_score = 0;
  for (let index in questions) {
    index = parseInt(index); // Index is a string, really?
    let question = questions[index];
    let score = _gradeQuestion(question)
    let difficulty = question.difficulty;
    let weighted_score = score * difficulty_multiplier[difficulty];

    total_score += weighted_score;

    // console.log('correctness:', parseFloat(correct));
    let display_index = index + 1;
    if (score === 1) {
      answers.push({
        text: 'Answer ' + display_index + ' was correct',
        correctness: 'correct',
        difficulty: difficulty,
        score: total_score,
      });
    } else if ( 0 < score && score < 1) {
      answers.push({
        text: 'Answer ' + display_index + ' was partially correct',
        correctness: 'partial',
        difficulty: difficulty,
        score: total_score,
      });
    } else {
      answers.push({
        text: 'Answer ' + display_index + ' was wrong',
        correctness: 'incorrect',
        difficulty: difficulty,
        score: total_score,
      });
    }
  }

  total_score *= final_score_multiplier;
  total_score = parseInt(total_score);

  return {
    score: total_score,
    answers: answers,
  };
}

module.exports = {gradeQuiz: gradeQuiz};
