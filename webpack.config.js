const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  context: __dirname,
  entry: './src/server.js',
  target: 'node',
  output: {
    path: `${__dirname}/build`,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|bower_components)/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
    }],
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
      },
    }, {
      test: /\.json?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'json-loader',
    }],
  },
  externals: nodeModules,
};
