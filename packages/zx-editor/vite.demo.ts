/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:21:11 (GMT+0900)
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, '../../demo'),
  },
})
