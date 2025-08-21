<template>
  <!-- 页面 -->
  <div class="page">
    <!-- 登陆模块 -->
    <div class="login-box">
      <!-- 标题 -->
      <h1 class="title">极客圆</h1>
      <!-- 表单 -->
      <el-form :model="form" :rules="formRules" ref="formRef">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" :prefix-icon="Cellphone" />
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="form.code" style="width: 70%;" placeholder="请输入验证码" :prefix-icon="Lock" show-password />
          <!-- 发送验证码按钮 -->
          <el-button type="primary" :disabled="isDown" style="width: 30%;" @click="sendCode">
            <span v-if="isDown">{{ count }}秒后重发</span>
            <span v-else>发送验证码</span>
          </el-button>
        </el-form-item>
        <!-- 许可协议 -->
        <el-form-item>
          <el-checkbox label="我已阅读并同意用户协议和隐私条款" v-model="form.status" />
        </el-form-item>
        <!-- 登陆按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { Cellphone, Lock } from '@element-plus/icons-vue'
import { getCodeApi, loginApi } from '@/api/index'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/userStore'
import { useRouter } from 'vue-router'
import { useCountDown } from '@/hooks'

// 表单组件的引用对象
const formRef = ref()

// 调用倒计时 hooks 函数
const { count, isDown, start } = useCountDown(5)

// 表单数据
const form = reactive({
  phone: '13222222222',
  code: '',
  status: false
})

// 调用获取token
const userStore = useUserStore()

// 获取跳转
const router = useRouter()

// 创建校验对象
const formRules = {
  phone: [
    { required: true, message: '手机号不能为空' },
    { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请填写正确的手机号' }
  ],
  code: [
    { required: true, message: '验证码不能为空' },
    { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
  ]
}

// 发送验证码按钮
const sendCode = () => {
  // 校验手机号
  formRef.value.validateField('phone', async (vr) => {
    // 为false退出
    if (!vr) return
    // 开启倒计时
    start()
    // 获取验证码
    const result = await getCodeApi(form.phone)
    // 回填到验证码
    form.code = result.data.code
  })
}

// 表单登陆按钮处理函数
const onSubmit = () => {
  if (!form.status) {
    ElMessage.error('请先阅读并勾选许可协议!')
    return
  }
  // 校验整个表单
  formRef.value.validate(async (vr) => {
    // 不通过
    if (!vr) {
      ElMessage.error('请填写表单!')
      return
    }
    // 通过
    const result = await loginApi(form)
    userStore.upDateToken(result.data.token)
    // 跳转后台主页
    ElMessage.success('登陆成功')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  })
}
</script>

<style scoped>
.page {
  height: 100vh;
  background-color: #a4dbff;

  .login-box {
    width: 400px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    /* 页面居中 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title {
      text-align: center;
      font-style: italic;
      color: #000000;
      margin-bottom: 15px;
    }
  }
}
</style>