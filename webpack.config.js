'use strict';

let webpack = require('webpack');
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
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },
      { test: /\.html$/, exclude: /node_modules/, loader:"html" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    })
  ],

  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: true,
    port: 3000
  }
};
