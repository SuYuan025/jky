<template>
  <el-menu default-active="0" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <!-- logo区 -->
    <el-menu-item index="0" class="title">
      <h1>极客圆</h1>
    </el-menu-item>
    <!-- 用户区 -->
    <el-menu-item index="2">
      <el-avatar :src="userStore.user.photo" />
      <span style="margin-left: 15px;">{{ userStore.user.nickname || userStore.user.mobile }}</span>
    </el-menu-item>
    <!-- 退出区 -->
    <el-menu-item index="2" plain @click="logout">
      <el-icon>
        <SwitchButton />
      </el-icon>
      <span>退出登陆</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import useUserStore from '@/store/userStore'
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 调用仓库函数
const userStore = useUserStore()
const router = useRouter()

// 声明周期函数，初始化用户信息
onMounted(() => {
  userStore.initUserProfile()
})

// 退出按钮
const logout = () => {
  ElMessageBox.confirm(
    '您确认退出登陆吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      router.push('/login')
      userStore.$reset()
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(() => {
      // 取消退出
    })
}
</script>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.title {
  width: 200px;
  text-align: center;
}
</style>