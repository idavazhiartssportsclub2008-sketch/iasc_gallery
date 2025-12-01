import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/iasc_gallery/',
  server: {
    host: true, // 👈 exposes the app to your network
    port: 5173, // optional - set a fixed port
  },
})
