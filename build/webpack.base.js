/**
 * Created by Capricorncd 2018/1/28
 * https://github.com/capricorncd
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'zx-editor': './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        // include: path.resolve(__dirname, 'src'),
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function () {
                return [
                  require('autoprefixer')()
                ]
              }
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              compress: true
            }
          }
        ]
      },
      {
        test: /\.(png|pneg|gif|jpg|jpeg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: false
    })
  ]
}
