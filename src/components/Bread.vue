<template>
  <el-breadcrumb separator="/" style="margin-bottom: 20px;">
    <el-breadcrumb-item v-for="item, index in breads">
      <a :href="item.path" v-if="index !== breads.length - 1">{{ item.metaName }}</a>
      <span v-else>{{ item.metaName }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 获取路径
const breads = computed(() => {
  const newArr = route.matched.map((item) => {
    return {
      path: item.path,
      metaName: item.meta.name
    }
  })
  return newArr
})
</script>