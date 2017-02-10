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
    root: [
      path.join( __dirname, '/src')
    ]
  },
  module  : {
    loaders : [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },
      { test: /\.html$/, exclude: /node_modules/, loader:"html" },
      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      // { test: /\.(ttf|eot|svg|otf)$/, loader: "file-loader" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},
      // font awesome loader woff
      {
        test: /\.(woff|woff2)\?v=\d+\.\d+\.\d+?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
      },

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(svg|gif)$/, loader: 'file'},
      // Font awesome loader for svg
      {
        test: /\.svg\?v=\d+\.\d+\.\d+?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
      }
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
    hot: true
  }
};
