//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
 // plugins: [react()],
  //base: './',
//})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // This ensures that Vite uses relative paths, good for Vercel
  esbuild: {
    loader: 'jsx',  // Ensure JSX files are handled correctly
    include: /src\/.*\.jsx?$/,  // Applies the JSX loader only to .jsx files in the src folder
  },
  build: {
    outDir: 'dist',  // Ensure the output directory is correctly set
  },
  server: {
    // Proxy API requests to the backend during local development
    proxy: {
      '/api': 'http://localhost:5000'  // Adjust port if your backend runs on a different port
    }
  },
  resolve: {
    alias: {
      // Optional: Add any path aliases here
      '@': '/src',  // This allows you to use '@' as a shorthand for your src folder
    }
  }
});
