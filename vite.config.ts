import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env': {
      BASE_URL: 'http://localhost:3000/'
    }
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'umd'],
      name: pkg.name,
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
