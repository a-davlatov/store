import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteCompression({
      verbose: true, // Показывает сжатые файлы в консоли
      disable: false, // Отключает плагин (по умолчанию false)
      threshold: 10240, // Минимальный размер файла для сжатия (10 KB)
      algorithm: 'gzip', // Используемый алгоритм (gzip, brotliCompress, deflate, deflateRaw)
      ext: '.gz', // Расширение сжатых файлов
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
