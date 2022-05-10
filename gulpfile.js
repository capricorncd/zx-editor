/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/08 15:04:45 (GMT+0900)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp')
const { rollup } = require('rollup')
const rollupTypescript = require('@rollup/plugin-typescript')
const rollupReplace = require('@rollup/plugin-replace')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
// https://www.npmjs.com/package/rollup-plugin-scss
const rollupScss = require('rollup-plugin-scss')
const banner = require('./scripts/build-banner')
const pkg = require('./package.json')

const bundleWriteOptions = {
  name: 'ZxEditor',
  sourcemap: true,
}

gulp.task('build', async function() {
  // ts -> esm
  const bundle = await rollup({
    input: './src/index.ts',
    plugins: [
      rollupTypescript(),
      rollupReplace({
        values: { '__VERSION__': pkg.version },
        preventAssignment: false,
      }),
      rollupScss({
        // outputStyle: 'compressed',
        output: './dist/zx-editor.css',
      }),
    ],
  })

  await bundle.write({
    ...bundleWriteOptions,
    file: 'dist/zx-editor.esm.js',
    format: 'esm',
    banner,
  })

  // esm -> umd(es5)
  const bundleUmd = await rollup({
    input: './dist/zx-editor.esm.js',
    plugins: [
      getBabelOutputPlugin({
        presets: [
          ['@babel/preset-env', { modules: 'umd' }],
        ],
      }),
    ],
  })

  await bundleUmd.write({
    ...bundleWriteOptions,
    file: 'dist/zx-editor.js',
  })

  // terser
  const bundleMin = await rollup({
    input: './dist/zx-editor.js',
    plugins: [terser()],
  })

  await bundleMin.write({
    ...bundleWriteOptions,
    file: 'dist/zx-editor.min.js',
    // plugins: [terser()],
  })
})
