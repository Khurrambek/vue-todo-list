import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      '**/*.spec.ts'
    ],
    exclude: [
      '**/node_modules/**'
    ],
    root: '../'
  }
})
