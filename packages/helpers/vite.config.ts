/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 21:21:11 (GMT+0900)
 */
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  test: {
    environment: 'jsdom',
  },
})
