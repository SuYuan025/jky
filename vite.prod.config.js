import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// 挂载需要的包 压缩空间
import { viteExternalsPlugin } from 'vite-plugin-externals'

import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    viteExternalsPlugin({
      vue: 'Vue',
      echarts: 'echarts',
      'element-plus': 'ElementPlus',
      quill: 'Quill',
      '@element-plus/icons-vue': 'ElementPlusIconsVue'
    }),
    createHtmlPlugin({
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: '后台管理系统',
          injectScript:
            `
            <script src="https://cdn.jsdelivr.net/npm/vue@3.5.18/dist/vue.global.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/echarts@6.0.0/dist/echarts.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/element-plus@2.10.7/dist/index.full.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.3.2/dist/index.iife.min.js"></script>
            `,
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