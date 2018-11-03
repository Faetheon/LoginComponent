var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?/,
      include: SRC_DIR,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  watchOptions: {
    poll: true
  }
};