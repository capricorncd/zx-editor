/**
 * Create by capricorncd
 * 2018/1/22 0022.
 * https://github.com/capricorncd
 */
// const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')

module.exports = merge(webpackBase, {
  mode: 'development',
  // https://webpack.js.org/configuration/devtool/#development
  // devtool: 'eval-source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    port: 9001,
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ]
})
