/**
 * Create by capricorncd
 * 2018/1/22 0022.
 * https://github.com/capricorncd
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const banner = require('./banner')
const pkg = require('../package.json')

module.exports = merge(webpackBase, {
  mode: 'production',
  output: {
    filename: 'js/[name].min.js'
  },
  module: {
    rules: [
      {
        test: /index\.js$/,
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            { search: '__VERSION__', replace: pkg.version }
          ]
        }
      }
    ]
  },
  plugins: [
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin(banner)
  ]
})
