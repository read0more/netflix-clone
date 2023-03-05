/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: ['**/__tests__/*.{ts,tsx}'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
