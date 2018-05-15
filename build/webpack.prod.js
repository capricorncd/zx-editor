/**
 * Create by zx1984
 * 2018/1/22 0022.
 * https://github.com/zx1984
 */
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    filename: 'js/[name].min.js'
  },
  plugins: []
})
