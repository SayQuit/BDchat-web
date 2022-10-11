<template>
  <div class="bgr">
    <template v-if="!account">
      <div class="center">
        <div class="header">
          <div class="header-name">
            <img src="../assets/reg.png" />
            <div>注册新用户</div>
          </div>
        </div>
        <div class="info">
          <div class="info-name">
            <div class="info-name-title">昵称</div>
            <input type="text" v-model="name" ref="name" />
          </div>
          <div class="info-psw">
            <div class="info-psw-title">密码</div>
            <input type="password" v-model="psw" />
          </div>
          <div class="info-pswMakeSure">
            <div class="info-pswMakeSure-title">确认密码</div>
            <input type="password" v-model="makesurePsw" />
          </div>
          <div class="operation">
            <el-button type="success" @click="handleRegister()">注册</el-button>
            <el-button type="warning" @click="handleClear()">清空</el-button>
            <el-button type="danger" @click="goBack()">返回</el-button>
          </div>
        </div>
      </div>
    </template>

    <template v-if="account">
      <div class="center">
        <div class="header">
          <div class="header-name">
            <img src="../assets/reg.png" />
            <div>注册新用户</div>
          </div>
        </div>
        <div class="info">注册成功!</div>
        <div class="info" style="margin-top: 160px">您的账号为</div>
        <div class="info" style="margin-top: 200px">{{ account }}</div>
        <el-button
          type="success"
          class="info"
          style="margin-top: 270px; width: 150px; height: auto"
          @click="goPage('AccountManage')"
          >返回主页</el-button
        >
        <el-button
          type="primary"
          class="info"
          style="margin-top: 340px; width: 150px; height: auto"
          @click="goPage('LoginPage')"
          >前往登录</el-button
        >
      </div>
    </template>
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
      name: "",
      psw: "",
      makesurePsw: "",
      account: "",
    };
  },
  mounted() {
    this.$refs.name.focus();
    this.store = useStore();
  },
  methods: {
    handleFont() {
      let url =
        this.store.state.requestUrl + "/user/newfont?account=" + this.account;
      axios.post(url).then(() => {});
    },

    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    goBack() {
      this.$router.back();
    },
    handleRegister() {
      if (!this.name) {
        this.$message({
          type: "error",
          message: "昵称不能为空",
        });
        return;
      } else if (!this.psw) {
        this.$message({
          type: "error",
          message: "密码不能为空",
        });
        return;
      } else if (this.psw !== this.makesurePsw) {
        this.$message({
          type: "error",
          message: "两次输入的密码不一致",
        });
        return;
      } else if (this.name.length > 20) {
        this.$message({
          type: "error",
          message: "昵称长度太长",
        });
        return;
      }
      var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,16}$/;
      if (!reg.test(this.psw)) {
        this.$message({
          type: "error",
          message:
            "密码不符合要求,密码长度应为8到16位包含字母与数字,不能包含特殊字符",
        });
        return;
      }
      let url =
        this.store.state.requestUrl +
        "/user/register?name=" +
        this.name +
        "&psw=" +
        this.psw;
      axios.post(url).then((data) => {
        if (data.data.account) {
          var dt = data.data;
          this.account = dt.account;
          this.handleFont();
          this.$message({
            type: "success",
            message: "注册成功",
          });
        } else {
          this.$message({
            type: "error",
            message: data.data.message,
          });
        }
      });
    },

    handleClear() {
      (this.name = ""), (this.psw = ""), (this.makesurePsw = "");
      this.$refs.name.focus();
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
  margin-left: 240px;
}
.header-name div {
  display: inline-block;
  margin-left: 50px;
}
.bgr .center .info {
  margin-top: 120px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 0;
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
  margin-top: 120px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
}
.operation > .el-button {
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
}
</style>