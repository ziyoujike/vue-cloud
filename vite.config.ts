import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [vue()],
  server: {
    open: true,//启动项目自动弹出浏览器
    port: 3000,//启动端口
    proxy: {
      '/api': {
        target: 'http://cloud.ziyoujike.cn',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
