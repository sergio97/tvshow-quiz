const config = {
  score_difficulty_multipliers: {
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
  },
  score_final_multiplier: 100,

  customize_season_count: 3,
  customize_seasons_default: [1, 2, 3],
  customize_difficulty_default: 4,

  question_api_url: 'http://127.0.0.1:8000/api/question',
};

module.exports = config;
