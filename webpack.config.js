if (process.versions.node.substring(0, 4) == "0.10") {
  // https://github.com/webpack/css-loader/issues/144#issuecomment-142613744
  require('es6-promise').polyfill();
}

var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var lodash = require("lodash");


// Get quiz constants. These values will be put
// into the output file (bundle.js) as constants
var config_defaults_path = path.join(__dirname, "quiz_config_defaults.json");
var config_overrides_path = path.join(__dirname, "quiz_config.json");
var quiz_config = JSON.parse(fs.readFileSync(config_defaults_path, 'utf8'));
// if quiz_config.json exists, merge it into quiz_config
try {
  fs.accessSync(config_overrides_path, fs.R_OK);
  var quiz_config_overrides = JSON.parse(
    fs.readFileSync(config_overrides_path, 'utf8')
  );
  lodash.assign(quiz_config, quiz_config_overrides);
} catch (e) {
  // Only ignore file-not-found error.
  // Other errors (for example, syntax error) should remain visible
  if (e.code !== "ENOENT") throw e;
}
// Stringify each value
for (var key in quiz_config) {
  quiz_config[key] = JSON.stringify(quiz_config[key]);
}


module.exports = {
  entry: "./quizmaster/js/main.jsx",
  output: {
    path: path.join(__dirname, "questionmaster/static/"),
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, "quizmaster"),
        exclude: /bundle\.js$/,
        loader: "eslint",
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // free global variables
      __QUIZ_CONFIG__: quiz_config,
    }),
  ],
};
