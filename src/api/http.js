import axios from 'axios'
import useUserStore from '@/store/userStore.js'
// 在js模块中实现跳转，需导入路由的router
import router from '@/router'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'http://47.105.62.192:3000/',

})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 为有权限的接口，挂载token
  if (config.url !== '/login/phone' && !config.url.startsWith('/getCode')) {
    config.headers.Authorization = useUserStore().token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 在响应式拦截器中，把response.data返回给组件，拿到返回的原数据
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  if (error.status === 401) {
    // 本次接口调用，token无效 重置为空
    router.push('/login')
    useUserStore().$reset()
    ElMessage.warning('登陆过期,请重新登陆')
  }
  return Promise.reject(error)
})

export default instance