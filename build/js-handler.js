/**
 * Created by Capricorncd.
 * Date: 2019/04/12 13:07
 * Copyright © 2017-present, https://github.com/capricorncd
 */
// https://rollupjs.org/guide/en
// https://www.rollupjs.com/guide/zh
const { rollup } = require('rollup')
// https://www.npmjs.com/package/rollup-plugin-commonjs
// const commonjs = require('rollup-plugin-commonjs')
// https://www.npmjs.com/package/rollup-plugin-node-resolve
const nodeResolve = require('rollup-plugin-node-resolve')
// https://www.npmjs.com/package/rollup-plugin-babel
const babel = require('rollup-plugin-babel')
// https://www.npmjs.com/package/rollup-plugin-uglify
// https://github.com/mishoo/UglifyJS2/blob/master/README.md#minify-options
const { uglify } = require('rollup-plugin-uglify')
// https://www.npmjs.com/package/rollup-plugin-replace
const replace = require('rollup-plugin-replace')
// https://www.npmjs.com/package/rollup-plugin-buble
// const buble = require('rollup-plugin-buble')
const banner = require('./banner')
const pkg = require('../package')

const isProd = process.env.NODE_ENV !== 'development'

/**
 * 处理js文件
 * @return {Promise<void>}
 */
async function handleJs (cb) {
  const bundle = await rollup({
    input: './src/js/index.js',
    external: [
      // 'dom7/dist/dom7.modular',
      // 'ssr-window'
    ],
    plugins: [
      replace({
        // delimiters: ['', ''],
        '__VERSION__': pkg.version
      }),
      nodeResolve({
        jsnext: false,
        module: true,
        main: true,  // for commonjs modules that have an index.js
        browser: true
      }),
      // babel({
      //   runtimeHelpers: true
      // }),
      // commonjs(),
      babel(),
      isProd && uglify({
        output: {
          comments: /^!/
        }
      })
    ]
  })

  await bundle.write({
    file: `./dist/js/zx-editor${isProd ? '.min' : ''}.js`,
    format: 'umd',
    name: 'ZxEditor',
    banner,
    sourcemap: isProd
  })
  cb()
}

module.exports = handleJs
