import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'DietAppDS',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'recharts'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    outDir: 'dist-lib',
    emptyOutDir: true,
  },
})
