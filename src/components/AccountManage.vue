<template>
  <div>
    <div class="bgr">
      <div class="log">
        <el-button
          type="success"
          class="login"
          size="medium"
          @click="handleLogin"
          >登录</el-button
        >
        <el-button type="primary" class="login" size="medium">注册</el-button>
        <el-button type="danger" class="login" size="medium">退出</el-button>
      </div>

      <div class="main">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  opacity: 0.9;
}

.bgr {
  background: url("../assets/2.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 963px;
}
.log {
  width: 240px;
  height: 50px;
  display: block;
  border-radius: 10px;
}
.log > .login {
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;
}
.main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 40px;
}
.item {
  cursor: pointer;

  height: 220px;
  background: #fff;
  border-radius: 10px;

  flex: 0 0 24%;
  text-align: center;
  background-color: white;
  /* 边距懒得算，css函数代替 */
  margin-right: calc(4% / 3);
  margin-bottom: calc(4% / 3);
}
.item:nth-child(4n) {
  margin-right: 0;
}
/* 使最后一个元素的边距填满剩余空间 */
.item:last-child {
  margin-right: auto;
}
</style>