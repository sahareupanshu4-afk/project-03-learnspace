import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({

  plugins: [react()],

  css: {

    postcss: {}, // Disable PostCSS processing to avoid conflicts

  },

  build: {
    outDir: 'build', // Output directory for production builds
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000 kB (1MB)
  },

})
