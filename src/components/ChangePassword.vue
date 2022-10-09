<template>
  <div class="bgr">
    <div class="center" v-if="!success">
      <div class="header">
        <div class="header-name">
          <img src="../assets/login.png" />
          <div>修改密码</div>
        </div>
      </div>
      <div class="info">
        <div class="info-name">
          <div class="info-name-title">账号</div>
          <input type="text" v-model="account" ref="account" />
        </div>
        <div class="info-psw">
          <div class="info-psw-title">密码</div>
          <input type="password" v-model="oldpsw" />
        </div>
        <div class="info-psw">
          <div class="info-psw-title">新密码</div>
          <input type="password" v-model="newpsw" />
        </div>
        <div class="info-psw">
          <div class="info-psw-title">新密码确认</div>
          <input type="password" v-model="surenewpsw" />
        </div>

        <div class="operation">
          <el-button type="primary" size="medium" @click="handleChange()"
            >修改</el-button
          >
          <el-button type="warning" size="medium" @click="handleClear()"
            >清空</el-button
          >
          <el-button type="danger" size="medium" @click="goBack()"
            >返回</el-button
          >
        </div>
      </div>
    </div>

    <template v-if="success">
      <div class="center">
        <div class="header">
          <div class="header-name">
            <img src="../assets/reg.png" />
            <div>修改密码</div>
          </div>
        </div>
        <div class="info">修改成功!</div>
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
          style="margin-top: 340px; width: 150px; height: auto;margin-left: 0;"
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
      account: "",
      oldpsw: "",
      newpsw: "",
      surenewpsw: "",
      store: "",
      success:false
    };
  },
  beforeMount() {
    this.store = useStore();
  },
  mounted() {
    // console.log(this.store.state.requestUrl);
    //   console.log(this.store.state.user);
    this.$refs.account.focus();
  },
  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    goBack() {
      this.$router.back();
    },
    handleClear() {
      (this.account = ""),
        (this.oldpsw = ""),
        (this.newpsw = ""),
        (this.surenewpsw = ""),
        this.$refs.account.focus();
    },

    handleChange() {
      if (this.account === "") {
        this.$message({
          type: "error",
          message: "账号不能为空",
        });
        return;
      }
      if (this.oldpsw === "") {
        this.$message({
          type: "error",
          message: "旧密码不能为空",
        });
        return;
      }
      if (this.surenewpsw != this.newpsw) {
        this.$message({
          type: "error",
          message: "两次输入的新密码不一致",
        });
        return;
      }
      var reg =
      /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,16}$/;
      if (!reg.test(this.newpsw)) {
        this.$message({
          type: "error",
          message:
            "密码不符合要求,密码长度应为8到16位包含字母与数字,不能包含特殊字符",
        });
        return;
      }
      // 做一些不能同时登录两个的判断
      let url =
        "http://127.0.0.1/user/changePsw?account=" +
        this.account +
        "&oldpsw=" +
        this.oldpsw +
        "&newpsw=" +
        this.newpsw;
        console.log(url);
      axios.post(url).then((res) => {
        console.log(res);
        if (res.data.state == "success") {
          this.$message({
            type: "success",
            message: "修改密码成功",
          });
          this.success=true
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      });

      //   this.goPage("UserPage");
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
  margin-top: 120px;
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
  margin-top: 70px;
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
.info-name-title {
  font-size: 20px;
}

.info-psw-title {
  font-size: 20px;
}
</style>