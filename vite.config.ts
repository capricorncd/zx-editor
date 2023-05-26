import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    watch: false,
    environment: 'jsdom',
  },
})
