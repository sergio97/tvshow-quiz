var React = require('react');
var lodash = require('lodash')

var Button = require('react-bootstrap/lib/Button');
var PanelGroup = require('react-bootstrap/lib/PanelGroup');
var Panel = require('react-bootstrap/lib/Panel');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');

var config = require('../config/config');

var QuizActions = require('../actions/QuizActions');


var QuizWelcome = React.createClass({
  getInitialState: function() {
      return {
        difficulty: config.customize_difficulty_default,
        seasons: lodash.clone(config.customize_seasons_default),
      };
  },
  resetCustomization: function() {
    this.setState(this.getInitialState());
  },
  changeDifficulty: function(event) {
    this.setState({
      difficulty: event.target.value,
    });
  },
  toggleSeason: function(season) {
    let new_seasons = this.state.seasons;
    let index = this.state.seasons.indexOf(season);
    if (index === -1) {
      new_seasons.push(season);
    } else {
      new_seasons.splice(index, 1);
    }

    this.setState({
      seasons: new_seasons,
    })
  },
  startQuiz: function() {
    QuizActions.loadQuiz(this.state);
  },
  render: function() {
    var self = this;

    var seasons = config.customize_season_count;
    var season_checkboxes = lodash.range(1, seasons + 1).map(function(season) {
      let onSeasonCheckboxClicked = function() {
        self.toggleSeason(season);
      }
      return (
        <div key={season}>
          <input type="checkbox"
                 checked={self.state.seasons.indexOf(season) !== -1}
                 onChange={onSeasonCheckboxClicked}></input>
          <label onClick={onSeasonCheckboxClicked}>Season {season}</label>
        </div>
      );
    });

    return (
      <div>
        <PanelGroup accordion xs={6}>
          <Panel header="Customize..." eventKey="1">
            <FormGroup>
              <Col sm={3}>
                <Button onClick={this.resetCustomization}>
                  Restore Defaults
                </Button>
              </Col>
            </FormGroup>
            <p>
              &nbsp;
            </p>
            <FormGroup>
              <Col sm={1}>
                <label>Difficulty</label>
              </Col>
              <Col sm={1}>
                {' '}
              </Col>
              <Col sm={3}>
                <input type="range"
                       min="1"
                       max="10"
                       step="1"
                       onChange={this.changeDifficulty}
                       value={this.state.difficulty} />
              </Col>
              <Col sm={1}>
                {this.state.difficulty}
              </Col>
            </FormGroup>
              <p>
                &nbsp;
              </p>
            <FormGroup>
              <Col sm={2}>
                <label>Questions from:</label>
              </Col>
              <Col sm={2}>
                {season_checkboxes}
              </Col>
            </FormGroup>
          </Panel>
        </PanelGroup>
        <Button bsStyle="success" onClick={this.startQuiz}>Start Quiz</Button>
      </div>
    );
  },
});

module.exports = QuizWelcome;
