<template>
  <el-menu router :default-active="route.path" style="height: 100%;">
    <el-menu-item index="/preview">
      <el-icon>
        <House />
      </el-icon>
      <span>数据概览</span>
    </el-menu-item>

    <el-menu-item index="/content-manage">
      <el-icon>
        <Document />
      </el-icon>
      <span>内容管理</span>
    </el-menu-item>

    <el-menu-item index="/post-article">
      <el-icon>
        <Edit />
      </el-icon>
      <span>发布文章</span>
    </el-menu-item>


    <el-menu-item index="/user-info">
      <el-icon>
        <User />
      </el-icon>
      <span>个人资料</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style scoped></style>