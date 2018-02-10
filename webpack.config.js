/**
 * Create by zx1984
 * 2018/1/22 0022.
 * https://github.com/zx1984
 */
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpackBase = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

let config = {
  entry: webpackBase.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    libraryTarget: "umd"
  },
  module: webpackBase.module,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: false
    })
  ]
}

if (isDev) {
  // devServer配置
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9001,
    overlay: {
      errors: true
    },
    hot: true
  }
  // 热更新插件
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
