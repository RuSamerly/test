import path from 'node:path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),
      // '@c': path.resolve('src/components'),
      // '@m': path.resolve('src/models'),
      // '@a': path.resolve('src/assets'),
      // '@s': path.resolve('src/stores'),
    }
  }
})
