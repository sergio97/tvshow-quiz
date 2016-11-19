var React = require('react');


var QuizHeader = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h2>{this.props.title}</h2>
      </div>
    );
  },
});

module.exports = QuizHeader;
