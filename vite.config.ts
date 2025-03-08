import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: './dist/web',
    assetsDir: 'assets',
    rollupOptions: {
      external: [
        /src\/fivem\/.*/, // Ignore all files under src/fivem
      ],
    },
  },
})
