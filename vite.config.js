import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      web3: 'web3/dist/web3.min.js',
    },
  },
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env,
  },
})
