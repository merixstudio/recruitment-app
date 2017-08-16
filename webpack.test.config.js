const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = require('./webpack.config');

module.exports = Object.assign({}, dev, {
  entry: {
    bundle: [
      './test/e2e.config.js',
      './app/index.jsx',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'app'),
  },
});
