<template>
  <!-- 表单 -->
  <el-form :model="form" :rules="formRules" ref="formRef" label-width="auto">
    <!-- 标题 -->
    <el-form-item label="标题" prop="title" style="width: 400px;">
      <el-input v-model="form.title" placeholder="请输入文章标题" />
    </el-form-item>
    <!-- 频道 -->
    <el-form-item label="频道" prop="channel_id" style="width: 400px;">
      <el-select v-model="form.channel_id" placeholder="请选择文章频道">
        <el-option v-for="item in channels" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <!-- 图片选项 -->
    <el-form-item label="封面">
      <el-radio-group v-model="form.cover_type">
        <el-radio :value="1">单图</el-radio>
        <el-radio :value="3">三图</el-radio>
        <el-radio :value="0">无图</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 封面 -->
    <el-form-item label=" " v-if="form.cover_type">
      <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="form.cover_type"
        v-model:file-list="files">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <!-- 文本编辑器 -->
    <el-form-item label="内容">
      <div style="width: 100%;">
        <!-- 要包裹一层，不然布局紊乱 -->
        <div id="editor" style="min-height: 200px;"></div>
      </div>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item label=" ">
      <el-button @click="onSubmit('草稿')">存为草稿</el-button>
      <el-button type="primary" @click="onSubmit('待审核')">发布文章</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from 'vue'
import { getChannelsApi, postArticleApi } from '@/api'
import Quill from 'quill'
// import 'quill/dist/quill.snow.css'
import { toolbarOptions } from './toolbar'
import { ElMessage } from 'element-plus'

// 初始化频道列表
const channels = ref([])

// 保存用户选择的图片
const files = ref([])

// 表单校验对象
const formRef = ref(null)

// 刷新页面自动渲染频道
onMounted(async () => {
  const result = await getChannelsApi()
  return channels.value = result.data
})

let quill

// 富文本编辑器
onMounted(() => {
  quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    }
  })
})

// 表单数据
const form = reactive({
  title: '',
  channel_id: '',
  cover_type: 1,
})

// 校验表单
const formRules = {
  title: [
    { required: true, message: '标题不能为空' }
  ],
  channel_id: [
    { required: true, message: '频道不能为空' }
  ],
}

// 侦听切换图片选项清空 files
watch(() => form.cover_type,
  () => {
    files.value = []
  })

const onSubmit = (status) => {
  formRef.value.validate(async (vr) => {
    if (!vr) return
    // 检验封面数量
    if (form.cover_type !== files.value.length) {
      if (files.value.length === 0) {
        ElMessage.error('请选择文章封面！')
      } else {
        ElMessage.error('封面数量不匹配！')
      }
      return
    }

    // 数据
    const fd = new FormData
    fd.append('title', form.title)
    fd.append('cover_type', form.cover_type)
    fd.append('channel_id', form.channel_id)
    fd.append('status', status)
    const content = quill.root.innerHTML
    fd.append('content', content)
    files.value.forEach((item) => {
      fd.append('cover_images', item.raw)
    })

    // 接口
    const result = await postArticleApi(fd)
    if (result.message == 'success') {
      ElMessage.success('发布文章成功')
    } else {
      ElMessage.error('发布文章失败')
    }
  })
}
</script>

<style scoped></style>