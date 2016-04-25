var jquery = require('jquery');
var lodash = require('lodash');
var config = require('../config/config')


function _create_query_string(object) {
  // Create query string from the keys and values of object

  let params = [];
  for (let key in object) {
      let value = object[key];
      if (lodash.isArray(value)) {
        value = value.join(',');
      }
      params.push(`${key}=${value}`)
    }
  return params.join('&');
}


function loadQuestions(quiz_config, callback) {
  // var example_questions = [
  //   {
  //     text: 'What is the female version of the word "his"',
  //     hint: '',
  //     answer_format: 'str_exact',
  //     answer: 'her',
  //     difficulty: 3,
  //   },
  //   {
  //     text: 'Which numbers are primary',
  //     hint: 'Remember: integers only!',
  //     answer_format: 'mc_multi',
  //     options: [
  //       {'text': '2'},
  //       {'text': '9'},
  //       {'text': '17'},
  //       {'text': '1729'},
  //     ],
  //     answer: ['2', '17'],
  //     difficulty: 5,
  //   },
  //   {
  //     text: 'Which character is a father',
  //     hint: 'A father is a male who has offspring',
  //     answer_format: 'mc_single',
  //     options: [
  //       {'text': 'The Mom'},
  //       {'text': 'The Dad'},
  //       {'text': 'The Daughter'},
  //       {'text': 'The Son'},
  //       {'text': 'The Dog'},
  //     ],
  //     answer: 'The Dad',
  //     difficulty: 2,
  //   },
  // ];
  var url = config.question_api_url;
  if (!lodash.isEmpty(quiz_config)) {
    url += '?' + _create_query_string(quiz_config)
  }

  jquery.getJSON(url, callback)
}

module.exports = {
  loadQuestions: loadQuestions,
}
