import { createRouter, createWebHistory } from "vue-router"

import Login from '@/views/Login/Index.vue'
import Layout from '@/views/Layout/Index.vue'
import Preview from '@/views/Preview/Index.vue'
import ContentManage from '@/views/ContentManage/Index.vue'
import PostArticle from '@/views/PostArticle/Index.vue'
import UserInfo from '@/views/UserInfo/Index.vue'
import useUserStore from '@/store/userStore'

// 创建路由对象
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 登陆页面路由
    { path: '/login', component: Login, meta: { name: '登陆' } },
    // 后台页面路由
    {
      path: '/', component: Layout, meta: { name: '首页' },
      // 子路由规则
      children: [
        { path: '/', redirect: '/preview' },
        { path: '/preview', component: Preview, meta: { name: '数据概览' } },
        { path: '/content-manage', component: ContentManage, meta: { name: '内容管理' } },
        { path: '/post-article', component: PostArticle, meta: { name: '发布文章' } },
        { path: '/user-info', component: UserInfo, meta: { name: '个人资料' } },
      ]
    }
  ]
})

// 注册全局前置守卫
router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = useUserStore().token
    if (!token) {
      return { path: '/login' }
    }
  }
})

export default router
