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
          >
          <el-button
            class="header-operation-close"
            type="warning"
            @click="handleClickApply()"
            v-if="applyLength == 0"
            >好友申请</el-button
          >
          <el-button
            class="header-operation-close"
            type="warning"
            @click="handleClickApply()"
            v-else
            >好友申请({{ applyLength }})</el-button
          >
          <el-button class="header-operation-close" type="danger"
            >退出</el-button
          >
          <div class="friendApply" v-show="ApplyIsOpen">
            <template v-for="(item, index) in applyList" :key="index">
              <div class="apply-item">
                <template v-if="item.sendID != account">
                  <div class="apply-item-desc">
                    <div>{{ item.sendID }} 申请加你为好友</div>
                  </div>

                  <template v-if="item.isSuccess == 0">
                    <div class="apply-item-opration">
                      <div class="apply-item-operation-success">
                        <el-button
                          type="success"
                          @click="handleSendAllowOrRejectApply(1, item)"
                          >同意</el-button
                        >
                      </div>
                      <div class="apply-item-operation-reject">
                        <el-button
                          type="danger"
                          @click="handleSendAllowOrRejectApply(-1, item)"
                          >拒绝</el-button
                        >
                      </div>
                    </div>
                  </template>

                  <template v-if="item.isSuccess == -1">
                    <div class="apply-item-hasReject reject">
                      <div class="mid">已拒绝</div>
                    </div>
                  </template>

                  <template v-if="item.isSuccess == 1">
                    <div class="apply-item-hasReject allow">
                      <div class="mid">已同意</div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="apply-item-desc">
                    <div>您申请添加 {{ item.getID }} 为好友</div>
                  </div>

                  <template v-if="item.isSuccess == 0">
                    <div class="apply-item-hasReject">
                      <div class="mid">等待中</div>
                    </div>
                  </template>

                  <template v-if="item.isSuccess == -1">
                    <div class="apply-item-hasReject reject">
                      <div class="mid">已拒绝</div>
                    </div>
                  </template>

                  <template v-if="item.isSuccess == 1">
                    <div class="apply-item-hasReject allow">
                      <div class="mid">已同意</div>
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="aside">
        <div class="aside-user">
          <el-avatar
            v-if="user.avatar"
            :src="user.avatar"
            class="aside-user-profilepicture"
          ></el-avatar>
          <el-avatar
            v-else
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="aside-user-profilepicture"
          ></el-avatar>
          <div class="aside-user-desc">
            <div class="aside-user-desc-name">
              {{ user.name }}({{ user.account }})
            </div>
            <div class="aside-user-desc-edit">
              <el-button type="primary" @click="handleChangeName()"
                >更换昵称</el-button
              >
              <el-button type="success" @click="handleChangeSignature()"
                >更换签名</el-button
              >
              <el-button type="warning" @click="handleChangeAvatar()"
                >更换头像</el-button
              >
              <div
                class="avatar-uploader"
                :show-file-list="false"
                v-show="avatarFileIsOpen"
              >
                <!-- <img v-if="user.avatar" :src="user.avatar" class="avatar" /> -->
                <div class="el-icon-plus avatar-uploader-icon">+</div>
                <input
                  type="file"
                  class="maintalk-footer-header-sendImg"
                  style="top: 0"
                  @change="handleAvatarSuccess"
                />
              </div>
            </div>
            <div class="aside-user-desc-signature">
              {{ user.signature }}
            </div>
          </div>
        </div>

        <div class="aside-search">
          <input type="text" class="aside-search-input" v-model="searchWord" />
          <div class="aside-search-button" @click="handleSearch">搜索</div>
        </div>

        <div class="aside-talkblock">
          <template v-for="(item, index) in tempFriendList" :key="index">
            <div
              class="aside-talkblock-talkitem"
              :class="{ currentSelect: selectFri == item }"
              @click="handleChangeSelectFri(item)"
            >
              <el-avatar
                v-if="item.avatar"
                :src="item.avatar"
                class="aside-user-profilepicture"
                style="left: 40px"
              ></el-avatar>
              <el-avatar
                v-else
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="aside-user-profilepicture"
                style="left: 40px"
              ></el-avatar>
              <div
                class="aside-user-desc"
                style="margin-left: 50px; width: 400px"
              >
                <div class="aside-user-desc-name">
                  {{ item.name }}({{ item.account }})
                </div>
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
                  <template v-if="item.ign == 1"
                    ><div style="width: 50px; text-align: left">
                      已屏蔽
                    </div></template
                  >
                  <template v-else>
                    <template v-if="item.isRead == 1">
                      <img src="../assets/isRead.png" />
                    </template>
                    <template v-else>
                      <img src="../assets/notRead.png" />
                    </template>
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

      <div class="maintalk" v-if="selectFri">
        <div class="maintalk-header">
          <div class="maintalk-header-desc">
            <el-avatar
              v-if="selectFri.avatar"
              :src="selectFri.avatar"
              class="aside-user-profilepicture"
              style="left: 40px"
            ></el-avatar>
            <el-avatar
              v-else
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              class="aside-user-profilepicture"
              style="left: 40px"
            ></el-avatar>
            <div class="aside-user-desc" style="left: 180px">
              <div class="aside-user-desc-name">
                {{ selectFri.name }}({{ selectFri.account }})
              </div>
              <div class="aside-user-desc-signature">
                {{ selectFri.signature }}
              </div>
            </div>
          </div>
          <div class="maintalk-header-operation">
            <el-button
              type="warning"
              @click="handleIgnoreFri()"
              v-if="selectFri.ign == 0"
              >屏蔽此人</el-button
            >
            <el-button
              type="warning"
              @click="handleCancelIgnoreFri()"
              v-if="selectFri.ign == 1"
              >取消屏蔽</el-button
            >
            <el-button type="danger" @click="handleDeleteFri()"
              >删除好友</el-button
            >
          </div>
        </div>

        <div class="maintalk-main" ref="scrollWin" id="maintalk-main">
          <template v-for="(item, index) in messageList" :key="index">
            <div :class="[item.sendID == account ? 'isMe' : 'isFri']">
              <div class="maintalk-main-talkitem">
                <div class="maintalk-main-talkitem-user">
                  <template v-if="item.sendID == account">
                    <el-avatar
                      v-if="user.avatar"
                      :src="user.avatar"
                      class="maintalk-main-talkitem-user-profilepicture"
                      style="left: 40px"
                    ></el-avatar>
                    <el-avatar
                      v-else
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      class="maintalk-main-talkitem-user-profilepicture"
                      style="left: 40px"
                    ></el-avatar>
                  </template>
                  <template v-else>
                    <el-avatar
                      v-if="selectFri.avatar"
                      :src="selectFri.avatar"
                      class="maintalk-main-talkitem-user-profilepicture"
                      style="left: 40px"
                    ></el-avatar>
                    <el-avatar
                      v-else
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      class="maintalk-main-talkitem-user-profilepicture"
                      style="left: 40px"
                    ></el-avatar>
                  </template>

                  <div class="maintalk-main-talkitem-user-name">
                    <template v-if="item.sendID == account"> 我 </template>
                    <template v-else>
                      {{ selectFri.name }}
                    </template>
                  </div>
                </div>
                <div class="maintalk-main-talkitem-time">{{ item.time }}</div>

                <template v-if="item.sendID == account">
                  <div v-if="item.isRead == 1" class="isread">已读</div>
                  <div v-else class="notread">未读</div>
                </template>

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
            <div
              class="maintalk-footer-header-expression"
              @click="handleClickEmoji()"
              :style="[emojiIsOpen ? 'background-color:#EEE;' : '']"
            >
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
              发 送
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

      <!-- <CropperComponent  ref="iscropper" style="width:100%;height: 200px;"></CropperComponent> -->
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
// import CropperComponent from "./CropperComponent.vue";

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
      tempFriendList: [],
      user: {
        name: "",
        account: "",
        avatar: "",
      },
      send: "",
      selectFri: "",
      messageList: [],
      emojiList: [],
      // avatarUrl: "",
      emojiIsOpen: false,
      avatarFileIsOpen: false,
      applyList: [],
      ApplyIsOpen: false,
      applyLength: 0,
      searchWord: "",
    };
  },
  created() {
    this.store = useStore();
    this.account = this.$route.query.account;
    this.getUserInfo();
    this.getFriendList();
    this.getApply();
    this.emojiList = this.store.state.emojiList;
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
      // console.log(item);
      this.handleReadMessage(item.account);
      this.getMessage();
    },
    handleClickEmoji() {
      this.emojiIsOpen = !this.emojiIsOpen;
    },
    handleClickApply() {
      this.ApplyIsOpen = !this.ApplyIsOpen;
    },
    handleChangeAvatar() {
      this.avatarFileIsOpen = !this.avatarFileIsOpen;
    },
    handleAddEmoji(emoji) {
      this.send += emoji;
    },
    handleAvatarSuccess(e) {
      let file = e.target.files[0];
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          let base64String = e.target.result;
          let base64Img = this.compressImg(base64String, 100, 0.3);
          base64Img.then((res) => {
            if (res.length > 12000) {
              this.$message({
                type: "error",
                message: "发送失败,图片过大",
              });
              return;
            }
            base64Img.then((res) => {
              let url =
                this.store.state.requestUrl +
                "/user/avatar?avatar=" +
                this.account +
                "&avatar=" +
                res;
              console.log(url);
              axios({
                method: "POST",
                url: "http://127.0.0.1:80/user/avatar",
                params: [res, this.account],
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }).then((res) => {
                if (res.data.state == "success") {
                  this.$message({
                    type: "success",
                    message: "发送成功",
                  });
                  this.getUserInfo();
                } else {
                  this.$message({
                    type: "error",
                    message: "发送失败",
                  });
                }
              });
            });
          });
        };
      }
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
    handleSearch() {
      console.log(this.searchWord);
      if (this.searchWord == "") {
        this.tempFriendList = [];
        for (let i = 0; i < this.friendList.length; i++) {
          this.tempFriendList.push(this.friendList[i]);
        }
        return;
      }
      this.tempFriendList = [];
      for (let i = 0; i < this.friendList.length; i++) {
        if (
          this.friendList[i].name.search(this.searchWord) != -1 ||
          this.friendList[i].account.search(this.searchWord) != -1
        ) {
          this.tempFriendList.push(this.friendList[i]);
        }
      }
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
    handleDeleteFri() {
      this.$confirm("删除该好友?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url =
            this.store.state.requestUrl +
            "/user/delete?myaccount=" +
            this.account +
            "&hisaccount=" +
            this.selectFri.account;
          axios.post(url).then((res) => {
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getFriendList();
              this.selectFri = "";
            } else {
              this.$message({
                type: "error",
                message: "删除失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleIgnoreFri() {
      this.$confirm("屏蔽该好友?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url =
            this.store.state.requestUrl +
            "/user/ignore?myaccount=" +
            this.account +
            "&hisaccount=" +
            this.selectFri.account +
            "&ignore=" +
            1;
          axios.post(url).then((res) => {
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "屏蔽成功",
              });
              this.getFriendList();
              this.selectFri = "";
            } else {
              this.$message({
                type: "error",
                message: "屏蔽失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消屏蔽",
          });
        });
    },
    handleCancelIgnoreFri() {
      this.$confirm("取消屏蔽该好友?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url =
            this.store.state.requestUrl +
            "/user/ignore?myaccount=" +
            this.account +
            "&hisaccount=" +
            this.selectFri.account +
            "&ignore=" +
            0;
          axios.post(url).then((res) => {
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "取消屏蔽成功",
              });
              this.getFriendList();
              this.selectFri = "";

            } else {
              this.$message({
                type: "error",
                message: "取消屏蔽失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
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
        console.log(this.messageList);
        this.scrollToBottom();
      });
    },
    getApply() {
      let url =
        this.store.state.requestUrl + "/apply/get?account=" + this.account;
      axios.get(url).then((res) => {
        this.applyList = res.data.applyList;
        this.applyLength = 0;
        this.applyList.forEach((element) => {
          if (element.sendID != this.account && element.isSuccess == 0) {
            this.applyLength++;
          }
        });
        // console.log(this.applyList);
      });
    },
    getFriendList(acc) {
      let url =
        this.store.state.requestUrl + "/user/friend?account=" + this.account;
      axios.get(url).then((res) => {
        this.friendList = res.data.friendList;
        // console.log(res.data);
        // console.log(res.data.friendList);
        this.tempFriendList = [];
        for (let i = 0; i < this.friendList.length; i++) {
          this.tempFriendList.push(this.friendList[i]);
          if (this.tempFriendList[i].account == acc) {
            this.selectFri = this.tempFriendList[i];
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
          // console.log(this.user);
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
        }
      });
    },
    handleSendAllowOrRejectApply(allow, item) {
      for (let i = 0; i < this.friendList.length; i++) {
        if (
          this.friendList[i].account == item.sendID ||
          this.friendList[i].account == item.getID
        ) {
          this.$message({
            type: "error",
            message: "对方已经是您的好友",
          });

          const url =
            this.store.state.requestUrl +
            "/apply/hasBeFriend?id=" +
            item.id +
            "&allow=" +
            1;
          axios.post(url).then((res) => {
            if (res.data.state == "success") {
              this.getApply();
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });

          return;
        }
      }

      const url =
        this.store.state.requestUrl +
        "/apply/allow?id=" +
        item.id +
        "&allow=" +
        allow +
        "&account1=" +
        this.account +
        "&account2=" +
        item.sendID;
      axios.post(url).then((res) => {
        if (res.data.state == "success") {
          this.getFriendList();
          this.getApply();
        } else {
          this.$message({
            type: "error",
            message: res.data.message,
          });
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
          for (let i = 0; i < this.friendList.length; i++) {
            if (this.friendList[i].account == value) {
              this.$message({
                type: "error",
                message: "对方已经是您的好友",
              });
              return;
            }
          }

          const url =
            this.store.state.requestUrl +
            "/apply/send?myaccount=" +
            this.account +
            "&hisaccount=" +
            value;
          axios.post(url).then((res) => {
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: "对方账号是:" + value + " 发送成功",
              });
              this.getFriendList();
              this.getApply();
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
            console.log(res.length);
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
  position: relative;
}
.header-operation {
  height: 100%;
  float: right;
  margin-right: 30px;
}
.header-operation > div {
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
  display: flex;
  box-sizing: border-box;
}
.maintalk-header-desc {
  height: 100%;
  flex: 7;

  /* border-right: 1px solid #999; */

  position: relative;
}
.maintalk-header-operation {
  flex: 3;
  height: 100%;
}
.maintalk-header-operation .el-button {
  display: block;
  margin-top: 40px;
  margin-left: 150px;
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
.emojiBlock div:hover {
  background-color: #ddd;
}
.avatar-uploader {
  width: 178px;
  display: inline-block;
  position: absolute;
  background-color: white;
  top: -50%;
  border: 1px dashed;
  z-index: 10;
  left: 95%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.header .friendApply {
  /* display: block; */
  width: 350px;
  height: 500px;
  background-color: white;
  position: absolute;
  left: 75%;
  top: 50%;
  border-radius: 10px;
  overflow: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 10;
  border: 1px solid #ddd;
}
.header .friendApply .apply-item {
  height: 125px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  z-index: 10;
  display: flex;

  /* display: block; */
}
.apply-item-desc {
  flex: 7;
  position: relative;
}

.apply-item-desc > div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
  color: #444;
}
.apply-item-opration {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
}
.apply-item-operation-success {
  flex: 1;
  position: relative;
}
.apply-item-operation-reject {
  flex: 1;
  position: relative;
}
.apply-item-operation-success > .el-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
}
.apply-item-operation-reject > .el-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
}
.apply-item-operation-reject .header .friendApply .apply-item:last-of-type {
  border: none;
}
.apply-item-hasReject {
  position: relative;
  flex: 3;
}
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.maintalk-main-talkitem .isread {
  color: #444;
  padding-top: 5px;
}
.maintalk-main-talkitem .notread {
  color: #777;
  padding-top: 5px;
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
.el-avatar img {
  width: 100%;
  height: 100%;
}
.reject {
  color: #ff0000;
}
.allow {
  color: #00ff00;
}
</style>