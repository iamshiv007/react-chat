import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-chat-q4gt.onrender.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
})
