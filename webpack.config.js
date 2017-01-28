'use strict';

let webpack = require('webpack');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join( __dirname, '/src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: '[name].js'
  },
  resolve : {
    extensions : ['', '.js']
  },
  module  : {
    loaders : [
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },
      {test: /\.html$/, loader: 'raw'}
    ]
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new CommonsChunkPlugin({
      name: ['vendor']
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    })
  ]
};
