/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:21:11 (GMT+0900)
 */
/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EventEmitter',
      fileName: (format) => `event-emitter.${format}.js`,
    },
  },
  test: {
    environment: 'jsdom',
  },
})
