var difficulty_multipliers = __QUIZ_CONFIG__.score_difficulty_multipliers // eslint-disable-line no-undef
var final_multiplier = __QUIZ_CONFIG__.score_final_multiplier // eslint-disable-line no-undef


function _gradeSingleQuestion(question) {
  if (question.answer == question.current_answer) {
    return 1;
  }
  return 0;
}

function _gradeMultiQuestion(question) {
  let result = 0;
  let answers = question.answer;
  for (let current_answer of question.current_answer) {
    if (answers.indexOf(current_answer) !== -1) {
      result += (1 / answers.length);
    } else {
      result -= (1 / answers.length);
    }
  }
  return Math.max(result, 0);
}

function _gradeStrExactQuestion(question) {
  var current_answer = question.current_answer.trim().toLowerCase();
  if (question.answer == current_answer) {
    return 1;
  }
  return 0;
}

function _gradeStrRegexQuestion(question) {
  var current_answer = question.current_answer.trim().toLowerCase();
  var regex = new RegExp(question.answer);
  var matches = regex.exec(current_answer);
  if (matches) {
    return 1
  }
  return 0
}

function _gradeQuestion(question) {
  switch(question.answer_format) {
    case 'mc_single':
      return _gradeSingleQuestion(question);
    case 'mc_multi':
      return _gradeMultiQuestion(question);
    case 'str_exact':
      return _gradeStrExactQuestion(question);
    case 'str_regex':
      return _gradeStrRegexQuestion(question);
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
    let multiplier = difficulty_multipliers[difficulty]
    let weighted_score = score * multiplier;

    total_score += weighted_score;

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

  total_score *= final_multiplier;
  total_score = parseInt(total_score);

  return {
    score: total_score,
    answers: answers,
  };
}

module.exports = {gradeQuiz: gradeQuiz};
