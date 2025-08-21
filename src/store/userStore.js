import { defineStore } from 'pinia'
import { getProfileApi } from '@/api/index'

const useUserStore = defineStore('user', {
  // 全局数据
  state: () => ({
    // 存储token值
    token: '',
    // 存储用户信息
    user: {}
  }),
  // 方法
  actions: {
    upDateToken(newToken) {
      this.token = newToken
    },
    async initUserProfile() {
      const result = await getProfileApi()
      this.user = result.data
    }
  },
  // 对当前数据持久化
  persist: true
})

export default useUserStore