import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set for GitHub Pages project sites; adjust if hosting elsewhere
export default defineConfig({
  plugins: [react()],
  base: './',
})
