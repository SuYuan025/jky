import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: '后台管理系统-dev',
          injectScript: ``,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})