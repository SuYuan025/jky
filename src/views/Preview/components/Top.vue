<template>
  <div class="box">
    <div class="left">
      <!-- 图标 -->
      <el-icon>
        <DataLine />
      </el-icon>
      <!-- 数量 -->
      <span>0</span>
      <!-- 描述 -->
      <span>今日访问量</span>
    </div>
    <div class="left">
      <!-- 图标 -->
      <el-icon>
        <User />
      </el-icon>
      <!-- 数量 -->
      <span>0</span>
      <!-- 描述 -->
      <span>新增用户量</span>
    </div>
    <div class="left">
      <!-- 图标 -->
      <el-icon>
        <ShoppingCartFull />
      </el-icon>
      <!-- 数量 -->
      <span>0</span>
      <!-- 描述 -->
      <span>今日购买量</span>
    </div>
    <div class="right">
      <!-- 第一行 -->
      <span></span>
      <span>课程访问量</span>
      <span>课程购买量</span>
      <span>听课人数</span>
      <span>机构数</span>
      <!-- 第二行 -->
      <span>总量</span>
      <span>0</span>
      <span>0</span>
      <span>0</span>
      <span>0</span>
      <!-- 第三行 -->
      <span>昨日</span>
      <span>0</span>
      <span>0</span>
      <span>0</span>
      <span>0</span>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  gap: 15px;
  font-size: 13px;
  flex-wrap: wrap;
}

.left {
  width: 150px;
  height: 150px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .el-icon {
    background-color: red;
    font-size: 26px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
  }
}

.left:nth-child(1)>.el-icon {
  background-color: #1ebeff;
}

.left:nth-child(2)>.el-icon {
  background-color: #ff7382;
}

.left:nth-child(3)>.el-icon {
  background-color: #00c3a2;
}

.right {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex: 1;
  min-width: 430px;
  height: 150px;

  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  align-items: center;
}
</style>