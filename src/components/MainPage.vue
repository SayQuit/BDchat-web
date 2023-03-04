<template>
  <div>
    <!-- <button @click="click()">点击打开</button>
    <button @click="start()">点击开始</button>
    <button @click="stop()">点击结束</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import socket from "../plugin/socket";

export default {
  components: {
  },

  methods: {
    // click() {
    //   socket.on("connect", () => {
    //     console.log("socketio-connect");
    //   });
    //   socket.on("message", (data) => {
    //     console.log(data);
    //   });

    // },
    // start() {
    //   console.log(socket);
    //   socket.emit("start", "开始");
    // },
    // stop() {
    //   socket.emit("stop", "暂停");
    // }
  },

}
</script>

<style scoped>
.log {
  width: 100%;
  height: 50px;
  margin-top: 15px;
}

.log>.login {
  display: inline-block;
  margin-left: 10px;
}
</style>