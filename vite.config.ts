import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      designSystem: path.resolve(__dirname, 'src/designSystem'),
      features: path.resolve(__dirname, 'src/features'),
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})