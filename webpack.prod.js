/**
 * Create by zx1984
 * 2018/1/22 0022.
 * https://github.com/zx1984
 */
const path = require('path')
const webpack = require('webpack')
const webpackBase = require('./webpack.base')

module.exports = {
  entry: webpackBase.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js',
    libraryTarget: "umd"
  },
  module: webpackBase.module,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
