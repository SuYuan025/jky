<template>
  <div>
    <div class="card">
      <el-form :model="form" label-width="auto">
        <!-- 状态单选框 -->
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="">全部</el-radio>
            <el-radio value="草稿">草稿</el-radio>
            <el-radio value="待审核">待审核</el-radio>
            <el-radio value="审核通过">审核通过</el-radio>
            <el-radio value="审核失败">审核失败</el-radio>
            <el-radio value="已删除">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道" prop="channel_id" style="width: 400px;">
          <el-select v-model="form.channel_id" placeholder="请选择文章频道" clearable>
            <el-option v-for="item in channels" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item label="时间" style="width: 400px;">
          <el-date-picker v-model="rangeDate" type="daterange" range-separator="-" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <!-- 筛选按钮 -->
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="card">
      <div class="table-title">根据筛选条件共查询到{{ total }}条结果:</div>
      <!-- 表格数据 -->
      <el-table :data="list" style="width: 100%" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号" width="60" />
        <!-- 封面 -->
        <el-table-column label="封面" width="90  ">
          <template #default="{ row }">
            <el-image style="width: 60px; height: 60px" :src="row.cover_images[0]" fit="fill" />
          </template>
        </el-table-column>
        <!-- 标题 -->
        <el-table-column prop="title" label="标题" />
        <!-- 状态 -->
        <el-table-column prop="status" label="状态" />
        <!-- 发布时间 -->
        <el-table-column label="发布时间">
          <template #default="{ row }">
            {{ dayjs(row.pub_date).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <!-- 文章频道 -->
        <el-table-column prop="channel_name" label="文章频道" />
        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-space>
              <el-link type="primary" :disabled="row.status === '已删除' || row.author_id !== store.user.id">修改</el-link>
              <!-- 删除 -->
              <el-link v-if="row.status === '已删除' || row.author_id !== store.user.id" type="danger"
                :disabled="row.status === '已删除' || row.author_id !== store.user.id">删除</el-link>

              <el-popconfirm title="确认删除此文章吗?" @confirm="delArticle(row.id)" v-else>
                <template #reference>
                  <el-link type="danger">删除</el-link>
                </template>
              </el-popconfirm>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination v-model:current-page="form.page" v-model:page-size="form.size" :page-sizes="[2, 3, 5, 10]"
          background layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { getChannelsApi, queryArticleApi, delArticleApi } from '@/api'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/userStore'

const store = useUserStore()

// 数据
const form = reactive({
  page: 1,
  size: 3,
  status: '',
  channel_id: '',
  st: '',
  et: ''
})

// 查询的数据
const list = ref([])
const total = ref(0)
const totalPage = ref(0)

// 选中筛选日期
const rangeDate = ref([])

// 侦听日期并保存
watch(rangeDate, (newValues) => {
  // 用户选择时间为空，重置
  if (!newValues || newValues.length === 0) {
    form.st = ''
    form.et = ''
    return
  }
  // 为 st et 赋值
  form.st = dayjs(newValues[0]).format('YYYY-MM-DD 00:00:00')
  form.et = dayjs(newValues[1]).format('YYYY-MM-DD 23:59:59')
})

// 初始化频道列表
const channels = ref([])

// 刷新页面自动渲染频道
onMounted(async () => {
  const result = await getChannelsApi()
  return channels.value = result.data
})

onMounted(() => {
  onSubmit()
})

const onSubmit = async () => {
  const result = await queryArticleApi(form)

  // 赋值
  list.value = result.data.rows
  total.value = result.data.total
  totalPage.value = result.data.totalPage
}

// 侦听每页展示多少条
const handleSizeChange = (newSize) => {
  form.size = newSize
  onSubmit()
}

// 侦听页码
const handleCurrentChange = (newPage) => {
  form.page = newPage
  onSubmit()
}

//根据 ID 删除文章
const delArticle = async (id) => {
  await delArticleApi(id)
  ElMessage.success('删除成功')
  onSubmit()
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.table-title {
  font-size: 13px;
  font-weight: bold;
  line-height: 40px;
  margin-bottom: 10px;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>