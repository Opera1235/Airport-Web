import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages 部署路徑，如果倉庫名不是根路徑，需要設置 base
// 例如：如果倉庫名是 Airport-Web，則 base 應該是 '/Airport-Web/'
// 如果是根路徑，則 base 應該是 '/'
export default defineConfig({
  plugins: [vue()],
  base: '/Airport-Web/',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});

