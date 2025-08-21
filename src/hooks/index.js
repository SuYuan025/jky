// 封装组件之间共享的 hooks函数
import { ref, watch } from 'vue'

// 封装倒计时函数
export const useCountDown = (num = 60) => {
  // 秒数
  const count = ref(num)
  // 是否开始倒计时
  const isDown = ref(false)
  let timerId = null
  // 开启倒计时函数
  const start = () => {
    if (isDown.value) return
    isDown.value = true
    timerId = setInterval(() => {
      count.value--
    }, 1000)
  }
  // 归零关闭定时器
  watch(count, (newCount) => {
    if (newCount <= 0) {
      clearInterval(timerId)
      // 把count还原
      count.value = num
      // 把isDown还原
      isDown.value = false
    }
  })

  return { count, isDown, start }
}