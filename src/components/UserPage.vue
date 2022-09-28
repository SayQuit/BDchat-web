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
      </div>
      <div class="header">
        <div class="header-operation">
          <el-button
            class="header-operation-min"
            type="primary"
            @click="goPage('AccountManage')"
            >最小化</el-button
          ><el-button class="header-operation-close" type="warning"
            >消息</el-button
          >
          <el-button class="header-operation-close" type="danger"
            >退出</el-button
          >
        </div>
      </div>

      <div class="aside">
        <div class="aside-user">
          <div class="aside-user-profilepicture"></div>
          <div class="aside-user-desc">
            <div class="aside-user-desc-name">{{ user.name }}</div>
            <div class="aside-user-desc-edit">
              <el-button type="primary" @click="handleChangeName()"
                >更换昵称</el-button
              >
              <el-button type="success">更换头像</el-button>
              <el-button type="warning" @click="handleChangeSignature()"
                >更换签名</el-button
              >
            </div>
            <div class="aside-user-desc-signature">
              {{ user.signature }}
            </div>
          </div>
        </div>

        <div class="aside-search">
          <input type="text" class="aside-search-input" />
          <div class="aside-search-button">搜索</div>
        </div>

        <div class="aside-talkblock">
          <template v-for="(item, index) in friendList" :key="index">
            <div
              class="aside-talkblock-talkitem"
              :class="{ currentSelect: selectFri == item }"
              @click="handleChangeSelectFri(item)"
            >
              <div class="aside-user-profilepicture" style="left: 40px"></div>
              <div
                class="aside-user-desc"
                style="margin-left: 50px; width: 400px"
              >
                <div class="aside-user-desc-name">{{ item.name }}</div>
                <div class="aside-user-desc-signature">
                  <template v-if="item.isMe"> 我: </template>
                  <template v-else> {{ item.name }}: </template>
                  <template v-if="item.isImg == 0">
                    {{ item.lastMsg }}
                  </template>
                  <template v-else> [图片] </template>
                </div>
              </div>
              <div class="aside-talkblock-talkitem-right">
                <div class="aside-talkblock-talkitem-right-isread">
                  <template v-if="item.isRead == 1">
                    <img src="../assets/isRead.png" />
                  </template>
                  <template v-else>
                    <img src="../assets/notRead.png" />
                  </template>
                </div>
                <div class="aside-talkblock-talkitem-right-time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="aside-talkblockbottom">
          <div class="aside-talkblockbottom-operation">
            <div class="aside-talkblockbottom-operation-cloud">词云</div>
            <div
              class="aside-talkblockbottom-operation-add"
              @click="handleAddFriend"
            >
              +
            </div>
            <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
          </div>
        </div>
      </div>

      <div class="maintalk">
        <div class="maintalk-header">
          <div class="maintalk-header-desc">
            <div class="aside-user-profilepicture" style="left: 60px"></div>
            <div class="aside-user-desc" style="left: 180px">
              <div class="aside-user-desc-name">{{ selectFri.name }}</div>
              <div class="aside-user-desc-signature">
                {{ selectFri.signature }}
              </div>
            </div>
          </div>
        </div>

        <div class="maintalk-main" ref="scrollWin" id="maintalk-main">
          <template v-for="(item, index) in messageList" :key="index">
            <div :class="[item.sendID == account ? 'isMe' : 'isFri']">
              <div class="maintalk-main-talkitem">
                <div class="maintalk-main-talkitem-user">
                  <div class="maintalk-main-talkitem-user-profilepicture"></div>
                  <div class="maintalk-main-talkitem-user-name">
                    <template v-if="item.sendID == account"> 我 </template>
                    <template v-else>
                      {{ selectFri.name }}
                    </template>
                  </div>
                </div>
                <div class="maintalk-main-talkitem-time">{{ item.time }}</div>
                <div
                  class="maintalk-main-talkitem-content"
                  :class="[
                    item.sendID == account
                      ? 'floatR greenMessage'
                      : 'floatL blueMessage',
                  ]"
                >
                  <template v-if="item.isImg == 0">
                    <div>{{ item.message }}</div>
                  </template>
                  <template v-else>
                    <div><img :src="item.base64" /></div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="maintalk-footer">
          <div class="maintalk-footer-header">
            <div class="maintalk-footer-header-expression" @click="handleClickEmoji()" :style="[emojiIsOpen?'background-color:#EEE;':'']">
              <img src="../assets/expression.png" />
            </div>
            <div class="maintalk-footer-header-outer">
              <img src="../assets/img.png" /><input
                type="file"
                @change="sendBase64"
                class="maintalk-footer-header-sendImg"
              />
            </div>

            <div class="maintalk-footer-header-expression"></div>

            <div
              class="maintalk-footer-header-send"
              @click="handleSendMessage()"
            >
              发送
            </div>
          </div>
          <textarea
            class="maintalk-footer-input"
            v-model="send"
            @keyup.enter="handleSendMessage()"
          ></textarea>
          
            <div class="emojiBlock" v-show="emojiIsOpen">
            <template v-for="(item, index) in emojiList" :key="index">
              <div @click="handleAddEmoji(item)">{{ item }}</div>
            </template>
          </div>
          
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
      store: "",
      account: "",
      friendList: [],
      user: {
        name: "",
        account: "",
      },
      send: "",
      selectFri: "",
      messageList: [],
      emojiList: [],
      emojiIsOpen:false
    };
  },
  created() {
    this.store = useStore();
    this.account = this.$route.query.account;
    // console.log(this.$route.query.account);
    this.getUserInfo();
    this.getFriendList();
    this.emojiList = this.store.state.emojiList;
    console.log(this.emojiList.length);
    // this.getLastMessage();
    // console.log(this.store.state);
  },

  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    handleChangeSelectFri(item) {
      // for (let i = 0; i < this.friendList; i++) {
      //   if (this.friendList[i].account == this.selectFri.account) {
      //     this.selectFri.name = this.friendList[i].name;
      //   }
      // }
      this.selectFri = item;
      // console.log(this.friendList);
      // console.log(this.selectFri);
      this.handleReadMessage(item.account);
      this.getMessage();
    },
    handleClickEmoji(){
      this.emojiIsOpen=!this.emojiIsOpen;
    },
    handleAddEmoji(emoji){
      this.send+=emoji
    },
    handleReadMessage(acc) {
      let url =
        this.store.state.requestUrl +
        "/message/read?myaccount=" +
        this.account +
        "&hisaccount=" +
        this.selectFri.account;

      axios.post(url).then(() => {
        // console.log('handleReadMessage',this.selectFri);
        this.getFriendList(acc);
      });
    },
    handleChangeName() {
      this.$prompt("请输入新昵称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "昵称格式不正确",
        // customClass: 'message-signature'
      })
        .then(({ value }) => {
          if (value.length > 20) {
            this.$message({
              type: "error",
              message: "昵称长度太长",
            });
            return;
          }
          const url =
            this.store.state.requestUrl +
            "/user/name?account=" +
            this.account +
            "&name=" +
            value;
          axios.post(url).then((res) => {
            // 这里要做一次好友是否存在的检验，直接在前端做
            console.log(res.data);
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "您的昵称是:" + value + " 发送成功",
              });
              this.getUserInfo();
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleChangeSignature() {
      // const h = _this.$createElement;
      this.$alert(
        "<textarea class='signatureInput' id='signature'></textarea>",
        "",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
        }
      ).then(() => {
        let value = document.getElementById("signature").value;
        if (value.length > 100) {
          this.$message({
            type: "error",
            message: "签名长度太长",
          });
          return;
        }
        const url =
          this.store.state.requestUrl +
          "/user/signature?account=" +
          this.account +
          "&signature=" +
          value;
        axios.post(url).then((res) => {
          console.log(res.data);
          if (res.data.state == "success") {
            this.$message({
              type: "success",
              message: "签名设置成功",
            });
            this.getUserInfo();
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        });
      });
    },
    getMessage() {
      let url =
        this.store.state.requestUrl +
        "/message/get?myaccount=" +
        this.account +
        "&hisaccount=" +
        this.selectFri.account;

      axios.get(url).then((res) => {
        this.messageList = res.data.message;
        this.getFriendList(this.selectFri.account);
        // console.log(this.messageList);
        // console.log('getMessage',this.selectFri);
        this.scrollToBottom();
      });
    },

    getFriendList(acc) {
      let url =
        this.store.state.requestUrl + "/user/friend?account=" + this.account;

      axios.get(url).then((res) => {
        this.friendList = res.data.friendList;
        console.log(res.data);
        for (let i = 0; i < this.friendList.length; i++) {
          if (this.friendList[i].account == acc) {
            this.selectFri = this.friendList[i];
          }
        }
      });
    },
    handleSendMessage() {
      const msg = this.send;
      if (msg.trim() == "") {
        this.send = "";
        return;
      }
      if (this.selectFri == "") {
        this.$message({
          type: "error",
          message: "发送失败",
        });
        return;
      }
      let url =
        this.store.state.requestUrl +
        "/message/send?myaccount=" +
        this.account +
        "&hisaccount=" +
        this.selectFri.account +
        "&message=" +
        msg;
      // console.log(url);
      axios.post(url).then((res) => {
        // console.log(res.data);
        if (res.data.state == "success") {
          this.$message({
            type: "success",
            message: "发送成功",
          });
          this.send = "";
          this.getMessage();
          // this.getFriendList();
        } else {
          this.$message({
            type: "error",
            message: "发送失败",
          });
        }
      });
    },
    goBack() {
      this.$router.back();
    },
    scrollToBottom: function () {
      this.$nextTick(() => {
        this.$refs.scrollWin.scrollTop = this.$refs.scrollWin.scrollHeight;
      });
    },
    getUserInfo() {
      let url =
        this.store.state.requestUrl + "/user/info?account=" + this.account;
      axios.post(url).then((res) => {
        if (res.data.user) {
          this.user = res.data.user;
        } else {
          console.log(res.data.message);
        }
      });
    },
    handleAddFriend() {
      this.$prompt("请输入对方账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "账号格式不正确",
      })
        .then(({ value }) => {
          const url =
            this.store.state.requestUrl +
            "/user/add?account1=" +
            this.account +
            "&account2=" +
            value;
          axios.post(url).then((res) => {
            // 这里要做一次好友是否存在的检验，直接在前端做
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "对方账号是:" + value + " 发送成功",
              });
              this.getFriendList();
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    compressImg(base64String, w, quality) {
      var getMimeType = function (urlData) {
        var arr = urlData.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        return mime;
      };
      var newImage = new Image();
      var imgWidth, imgHeight;

      var promise = new Promise((resolve) => (newImage.onload = resolve));
      newImage.src = base64String;
      return promise.then(() => {
        imgWidth = newImage.width;
        imgHeight = newImage.height;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = (w * imgHeight) / imgWidth;
          } else {
            canvas.height = w;
            canvas.width = (w * imgWidth) / imgHeight;
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL(getMimeType(base64String), quality);
        console.log(base64);
        return base64;
      });
    },
    sendBase64(e) {
      let file = e.target.files[0];
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          let base64String = e.target.result;
          // console.log(base64String);
          let base64Img = this.compressImg(base64String, 100, 0.7);
          base64Img.then((res) => {
            // console.log(res);
            console.log(res.length);
            // console.log(base64Img);
            if (res.length > 12000) {
              this.$message({
                type: "error",
                message: "发送失败,图片过大",
              });
              return;
            }

            axios({
              method: "POST",
              url: "http://127.0.0.1:80/message/sendImg",
              params: [res, this.account, this.selectFri.account],
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }).then((res) => {
              if (res.data.state == "success") {
                this.$message({
                  type: "success",
                  message: "发送成功",
                });
                this.getMessage();
              } else {
                this.$message({
                  type: "error",
                  message: "发送失败",
                });
              }
            });
          });
        };
      }
    },
  },
};
</script>

<style scoped>
/* * {
  color: #555555;
  opacity: 0.9;
}
*:hover {
  opacity: 1;
} */
.el-button {
  color: white;
}
.header {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}
.header-operation {
  height: 100%;
  float: right;
  margin-right: 30px;
}
.header-operation div {
  height: 100%;
  width: 33%;
  display: inline-block;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.header-operation-min {
  margin-left: 10px;
}
.header-operation-max {
  margin-left: 10px;
}
.header-operation-close {
  margin-left: 10px;
}

.aside {
  display: inline-block;
  width: 40%;
  height: 970px;
  margin-left: 40px;

  vertical-align: top;
}
.aside-user {
  height: 100px;
  position: relative;
  padding-left: 40px;
  background-color: white;
  border-radius: 10px;
}

.aside-user-profilepicture {
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border: 1px solid #999;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.aside-user-desc {
  height: 80px;
  width: 70%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 140px;
}
.aside-user-desc-name {
  height: 40px;
  line-height: 40px;

  display: inline-block;
}
.aside-user-desc-edit {
  /* display: inline-block; */
  float: right;
  height: 40px;
}
.aside-user-desc-edit .el-button {
  margin-left: 8px;
}
.aside-user-desc-signature {
  height: 40px;
  line-height: 40px;
  font-size: 15px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  display: block;
}

.aside-search {
  height: 40px;
  margin-top: 30px;
  background-color: white;
  border-radius: 10px;
}
.aside-search-input {
  outline: none;
  vertical-align: top;

  width: 65%;
  height: 100%;
  display: inline-block;

  padding: 0 10px;
  box-sizing: border-box;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  text-decoration: none;
  border-width: 1px;
}
.aside-search-button {
  width: 35%;
  height: 100%;
  display: inline-block;
  text-align: center;

  line-height: 40px;

  border-left: none;
  box-sizing: border-box;
  cursor: pointer;
}

.aside-talkblock {
  height: 730px;
  margin-top: 30px;
  box-sizing: border-box;
  border-right: none;
  overflow-y: scroll;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.aside-talkblock-talkitem {
  position: relative;
  height: 200px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.aside-talkblock-talkitem-right {
  width: 150px;
  height: 100%;
  position: relative;
  float: right;
  margin-right: 30px;
}
.aside-talkblock-talkitem-right-isread {
  position: absolute;
  top: 37%;
  width: 20px;
  height: 20px;
  left: -20%;
}
.aside-talkblock-talkitem-right-isread img {
  width: 100%;
  height: 100%;
}
.aside-talkblock-talkitem-right-time {
  position: absolute;
  top: 56%;
  left: -50%;
}
.aside-talkblockbottom {
  height: 40px;
  border-top: 1px solid #999;
  box-sizing: border-box;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.aside-talkblockbottom-operation {
  float: right;
}
.aside-talkblockbottom-operation div {
  width: 100px;
  text-align: center;
  display: inline-block;
  line-height: 40px;
  border: 1px solid #999;
  border-top: none;
  border-bottom: none;
  border-right: none;
  cursor: pointer;
}

.maintalk {
  margin-bottom: 30px;
  margin-right: 20px;
  margin-left: 20px;
  display: inline-block;
  height: 970px;
  width: 55%;

  border: 1px solid #999;
  box-sizing: border-box;

  border-radius: 10px;
  background-color: white;
  vertical-align: top;
  border-radius: 10px;
}
.maintalk-header {
  height: 20%;
  width: 100%;
  border-bottom: 1px solid #999;

  box-sizing: border-box;
}
.maintalk-header-desc {
  height: 100%;
  width: 70%;

  border-right: 1px solid #999;

  position: relative;
}

.maintalk-main {
  height: 60%;
  width: 100%;
  border-bottom: 1px solid #999;
  box-sizing: border-box;

  border-right: none;
  /* overflow-y: scroll; */
  overflow: auto;
  padding: 30px 0;
}
.maintalk-main-talkitem {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 50px;
}
.maintalk-main-talkitem-user {
  display: block;
  width: auto;
}
.maintalk-main-talkitem-user-profilepicture {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 1px solid #999;
  display: inline-block;
  vertical-align: middle;
}
.maintalk-main-talkitem-user-name {
  margin-left: 15px;
  display: inline-block;
  vertical-align: middle;
  color: #444;
}

.maintalk-main-talkitem-time {
  margin-top: 10px;
  color: #777;
}
.maintalk-main-talkitem-content {
  margin-top: 15px;
  width: auto;
  margin-right: 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  display: inline-block;
  color: #111;
  flex: 1;
}
.floatR {
  text-align: left;
  float: right;
  margin-left: 200px;
}
.floatL {
  margin-right: 200px;
}
.isMe {
  text-align: right;
  display: flex;
}
.isFri {
  text-align: left;
  display: flex;
}
.maintalk-footer {
  height: 20%;
  width: 100%;
  box-sizing: border-box;

  position: relative;
}
.maintalk-footer-header {
  height: 30%;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
.maintalk-footer-header-expression {
  height: 100%;
  width: 5%;
  box-sizing: border-box;
  border-right: 1px solid #999;
  cursor: pointer;

  display: inline-block;
}
.maintalk-footer-header-expression img {
  box-sizing: border-box;
  padding: 10%;
  width: 100%;
  height: 100%;
}
.maintalk-footer-header-outer {
  /* opacity: 0; */
  height: 100%;
  width: 5%;
  box-sizing: border-box;
  border-right: 1px solid #999;
  cursor: pointer;
  vertical-align: top;

  display: inline-block;
  position: relative;
}
.maintalk-footer-header-outer img {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.maintalk-footer-header-sendImg {
  opacity: 0;
  vertical-align: top;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
}
.maintalk-footer-header-send {
  background-color: #ccccff;
  text-align: center;
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  border-left: 1px solid #999;
  cursor: pointer;

  float: right;
  line-height: 55px;
}
.maintalk-footer-input {
  width: 100%;
  height: 70%;
  box-sizing: border-box;

  outline: none;
  border: 0;

  font-size: 20px;
  padding: 10px;

  border-radius: 10px;
}

/*滚动条的宽度*/
::-webkit-scrollbar {
  width: 4px;
}

/*滚动条里面小方块*/
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

/*滚动条里面轨道*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
body {
  overflow-x: hidden;
}

.container {
  width: 100vw;
  overflow-x: hidden;
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
.bgr {
  background: url("../assets/2.png") no-repeat;
  background-size: cover;
  width: 100%;

  height: 1200px;
  opacity: 1;
}
.currentSelect {
  background-color: #ddd;
}
.greenMessage {
  background-color: #95eb6c;
  color: #111;
}
.blueMessage {
  background-color: #1099fe;
  color: white;
}
.emojiBlock {
  width: 500px;
  background-color: white;
  margin: 20px;
  border-radius: 10px;
  border: 1px solid #777;

  position: absolute;
  top: -244%;
  left: -30%;
}
.emojiBlock div {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 1px;
  box-sizing: border-box;
  /* border-right: 1px solid black;
  border-bottom: 1px solid black; */
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.emojiBlock div:hover{
  background-color: #DDD;
}
</style>

<style>
/* .message-signature input{
    height:200px;
  } */
.signatureInput {
  width: 300px;
  height: 100px;
  padding: 10px;
  outline: none;
}
</style>