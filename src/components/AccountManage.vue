<template>
  <div>
    <div class="bgr">
      <div class="log">
        <el-button
          type="primary"
          class="login"
          size="medium"
          @click="goPage('LoginPage')"
          >登录</el-button
        >
        <el-button
          type="success"
          class="login"
          size="medium"
          @click="goPage('RegisterPage')"
          >注册</el-button
        >
        <!-- <el-button
          type="warning"
          class="login"
          size="medium"
          @click="giveImg()"
          >传输图片</el-button> -->
        
      </div>

      <div class="main">
        <template v-for="(item, index) in user" :key="index">
          <div class="item" @click="handleClickAccount(item.account)">
            <div class="avatar" v-if="item.avatar"><img :src="item.avatar"></div>
            <div class="avatar" v-else><img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></div>
            <div class="account">账号:{{ item.account }}</div>
            <div class="name">昵称:{{ item.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  data() {
    return {
      store: "",
      user: "",
    };
  },
  mounted() {
    const store = useStore(); // 该方法用于返回store 实例

    this.store = store;
    this.user = this.store.state.user;
    // console.log(this.user); // store 实例对象
    // console.log();
  },

  methods: {
    // giveImg(){
    //   // console.log('img');

    // },
    goPage(pageName) {
      // console.log(pageName);
      // console.log(this.router);
      this.router.push({ name: pageName });
    },
    handleClickAccount(TheAccount) {
      this.$router.push({ path: "/UserPage", query: { account: TheAccount } });
    },
  },
};
</script>

<style scoped>
.item {
  opacity: 0.8;
}

.item:hover {
  opacity: 1;
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
.avatar{
  width: 100px;
  height: 100px;

  
  margin: 0 auto;
  margin-top: 20px;
}
.avatar img{
  width: 100%;
  height: 100%;  
  border-radius: 50px;

}
.account {
  margin-top: 20px;
}
.name {
  margin-top: 10px;
}
</style>