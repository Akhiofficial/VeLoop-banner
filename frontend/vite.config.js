import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js + R3F into a separate lazy chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Suppress the 500 kB warning for the three-vendor chunk (it's expected)
    chunkSizeWarningLimit: 1400,
  },
})

