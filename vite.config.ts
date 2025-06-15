import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Use base path only for GitHub Pages, not for Amplify
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/invoiceable-web/' : '/',
});
