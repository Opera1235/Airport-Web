import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages部署路径，如果仓库名不是根路径，需要设置base
// 例如：如果仓库名是 Airport-Web，则base应该是 '/Airport-Web/'
// 如果是根路径，则base应该是 '/'
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

