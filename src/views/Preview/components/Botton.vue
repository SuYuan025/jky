<template>
  <div class="box">
    <div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'))
  // 图标自适应窗口
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  // 绘制图表
  myChart.setOption({
    title: {
      text: '在线听课人数'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  })
})
</script>

<style scoped>
.box {
  margin-top: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 15px;
}
</style>