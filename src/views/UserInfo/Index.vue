<template>
  <el-form :model="form" label-width="auto" style="max-width: 400px" :rules="formRules" ref="formRef">
    <el-form-item label="手机号">
      <el-input v-model="form.mobile" disabled />
    </el-form-item>

    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" placeholder="请输入昵称" />
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio value="男">男</el-radio>
        <el-radio value="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-col :span="11">
        <el-date-picker v-model="form.birthday" type="date" placeholder="请选择生日" style="width: 100%" />
      </el-col>
    </el-form-item>

    <el-form-item label="头像">
      <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false"
        :on-change="handleAvatarChange">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item label=" ">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import useUserStore from '@/store/userStore.js'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { putProfileApi } from '@/api/index'

const store = useUserStore()
const formRef = ref(null)

// 头像
const imageUrl = ref(store.user.photo || '')

// 数据
const form = reactive({ ...store.user, photo: null })

const fd = new FormData()

// 上传头像
const handleAvatarChange = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  form.photo = uploadFile.raw
}

// 校验表单
const formRules = {
  nickname: [{ required: true, message: '昵称不能为空!' }],
  gender: [{ required: true, message: '性别不能为空!' }],
  birthday: [{ required: true, message: '生日不能为空!' }],
}

// 保存按钮
const onSubmit = () => {
  formRef.value.validate(async (vr) => {
    if (!vr) return

    fd.append('nickname', form.nickname)
    fd.append('gender', form.gender)
    fd.append('birthday', form.birthday)
    fd.append('photo', form.photo)
    await putProfileApi(fd)
    // 提示消息
    ElMessage.success('保存成功')
    // 刷新
    store.initUserProfile()
  })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>