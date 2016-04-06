if (process.versions.node.substring(0, 4) == "0.10") {
  // https://github.com/webpack/css-loader/issues/144#issuecomment-142613744
  require('es6-promise').polyfill();
}

var path = require("path");



module.exports = {
  entry: "./quiz/js/main.jsx",
  output: {
    path: path.join(__dirname, "quiz"),
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, "quiz"),
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ["style", "css"],
      },
    ],
  },
};
