var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: __dirname,
  entry: './src/server.js',
  target: "node",
  output: {
    path: __dirname + "/build",
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /(node_modules|bower_components)/,
      include: [
        path.resolve(__dirname, 'src'),
      ]
    }],
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  externals: nodeModules
}
