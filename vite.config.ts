import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const REPO_NAME = 'gateflow';

export default defineConfig({
  // No GitHub Actions o site é servido em /<repo>/, no ambiente local em /.
  base: process.env.GITHUB_ACTIONS ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});