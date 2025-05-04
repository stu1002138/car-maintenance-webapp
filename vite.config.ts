import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  base: '/car-maintenance-webapp/',
  plugins: [react(), UnoCSS(), eslint()],
})
