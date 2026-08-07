import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'animations'
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('hookform')) return 'forms'
            if (id.includes('@tanstack')) return 'query'
            if (id.includes('swiper')) return 'swiper'
            if (id.includes('lucide')) return 'icons'
            if (id.includes('react-router-dom')) return 'router'
            if (id.includes('@radix-ui')) return 'ui'
            return 'vendor'
          }
        },
      },
    },
  },
})