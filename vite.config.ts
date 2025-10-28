import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { livestoreDevtoolsPlugin } from '@livestore/devtools-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflare(),
    livestoreDevtoolsPlugin({ schemaPath: './src/livestore/schema.ts' })
  ],
  optimizeDeps: {
    exclude: ['@livestore/wa-sqlite'],
  },
})