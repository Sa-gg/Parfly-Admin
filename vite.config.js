import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // VERY important
  plugins: [react()],
  server: {
    host: true,  // allow external access
    port: 5173, // Use a different port from backend
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to backend
    },
    allowedHosts: [
      'light-dodos-hang.loca.lt', // Add the Localtunnel domain
    ],
  },
});
