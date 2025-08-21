<template>
  <el-container>
    <el-header class="header">
      <!-- 头部 -->
      <Header></Header>
    </el-header>
    <el-container class="section">
      <el-aside width="200px">
        <!-- 导航栏 -->
        <Aside></Aside>
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <Bread></Bread>
        <!-- 显示页面 -->
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Bread from '@/components/Bread.vue'
</script>

<style scoped>
.section {
  height: calc(100vh - 60px);
}

.header {
  padding: 0;
}
</style>