import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['**/tests/**/*.test.ts'],
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
})
