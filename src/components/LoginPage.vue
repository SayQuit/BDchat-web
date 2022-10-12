<template>
  <div class="bgr">
    <div class="center">
      <div class="header">
        <div class="header-name">
          <img src="../assets/login.png" />
          <div>登录</div>
        </div>
      </div>
      <div class="info">
        <div class="info-name">
          <div class="info-name-title">账号</div>
          <input type="text" v-model="account" ref="account" />
        </div>
        <div class="info-psw">
          <div class="info-psw-title">密码</div>
          <input type="password" v-model="psw" />
        </div>

        <div class="operation">
          <el-button type="primary" @click="handleLogin()">登录</el-button>
          <el-button type="warning" @click="handleClear()">清空</el-button>
          <el-button type="danger" @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useRouter } from "vue-router";
import axios from "axios";
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
      account: "",
      psw: "",
      store: "",
    };
  },
  beforeMount() {
    this.store = useStore();
  },
  mounted() {
    this.$refs.account.focus();
  },
  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    goBack() {
      this.$router.back();
    },

    // 清除输入数据
    handleClear() {
      this.account = "";
      this.psw = "";
      this.$refs.account.focus();
    },

    // 登录请求函数
    handleLogin() {
      // 条件判断
      if (this.account === "") {
        this.$message({
          type: "error",
          message: "账号不能为空",
        });
        return;
      }
      if (this.psw === "") {
        this.$message({
          type: "error",
          message: "密码不能为空",
        });
        return;
      }

      // 排除已登录再次登录的情况
      this.account = this.account.trim();
      for (let i = 0; i < this.store.state.user.length; i++) {
        if (this.store.state.user[i].account == this.account) {
          this.$message({
            type: "error",
            message: "用户已登录",
          });
          return;
        }
      }

      // 发出请求
      let url =
        this.store.state.requestUrl +
        "/user/login?account=" +
        this.account +
        "&psw=" +
        this.psw;
      axios.post(url).then((data) => {
        var dt = data.data;
        if (dt.isLogin) {
          const u = {
            name: dt.name,
            token: dt.token,
            avatar: dt.avatar,
            account: dt.account,
          };
          this.store.commit("handlePushUser", u);
          // var ac = this.account;
          this.$message({
            type: "success",
            message: "登录成功",
          });
          let TokenList = [];
          if (localStorage.getItem("bd_chat_token"))
            TokenList = JSON.parse(localStorage.getItem("bd_chat_token"));
          TokenList.push(dt.token);
          localStorage.setItem("bd_chat_token", JSON.stringify(TokenList));
          this.$router.push({ name: "UserPage", params: { token: dt.token } });
        } else {
          this.$message({
            type: "error",
            message: dt.message,
          });
        }
      });
    },
  },
};
</script>
  
  <style scoped>
* {
  font-size: 28px;
}

.bgr {
  background: url("../assets/2.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 1080px;
}
.info .tips {
  color: red;
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
}
.center {
  position: absolute;
  margin-top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 800px;
  border: 1px solid #999;
  background-color: white;
  border-radius: 10px;
}
.header {
  height: 150px;
  width: 100%;
  border-bottom: 1px solid #999;
}
.header-name {
  font-size: 40px;
  color: #444;
  padding-top: 50px;
}
.header-name img {
  height: 40px;
  color: #444;
  vertical-align: middle;
  display: inline-block;
  margin-left: 280px;
}
.header-name div {
  display: inline-block;
  margin-left: 50px;
}
.info {
  margin-top: 120px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.info div {
  display: inline-block;
}
.info > div > div {
  margin-right: 30px;
  line-height: 60px;
}
.info > div {
  margin-bottom: 30px;
  width: 450px;
  height: 60px;
  display: inline-block;
}
.info input {
  /* display: inline-block; */
  width: 280px;
  height: 60px;
  border: 1px solid #999;
  float: right;
  border-radius: 10px;
  outline: none;
  padding: 0 10px;
}

.info > .operation {
  margin: 0 auto;
  margin-top: 120px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
}
.operation > .el-button {
  font-size: 16px;
  margin-left: 10px;
}
</style>