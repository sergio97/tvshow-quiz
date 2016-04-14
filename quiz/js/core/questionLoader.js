var jquery = require('jquery');


console.log('this is how we will get the questions:', jquery.getJSON);


function loadQuestions() {
  return [
    {
      text: 'What is the female version of the word "his"',
      hint: '',
      answer_format: 'str_exact',
      answer: 'her',
      difficulty: 3,
      current_answer: '',
    },
    {
      text: 'Which numbers are primary',
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
}

module.exports = {
  loadQuestions: loadQuestions,
}
