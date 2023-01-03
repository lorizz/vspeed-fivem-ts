import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'E:/Games/FiveM/VSpeed Server/server-data/resources/[local]/[vspeed]/core/nui/build',
  },
});
