// const requestUrl='http://127.0.0.1:80';
// const user=[]

// export default {
//     requestUrl,
//     user

// };

import { createStore } from 'vuex'

export default createStore({
  state: {
    requestUrl: 'http://127.0.0.1:80',
    user: [],
    emojiList:
    [
      "😀",
      "😁",
      "😂",
      "😃",
      "😄",
      "😅",
      "😆",
      "😇",
      "😈",
      "😉",
      "😊",
      "😋",
      "😌",
      "😍",
      "😎",
      "😏",
      "😐",
      "😑",
      "😒",
      "😓",
      "😔",
      "😕",
      "😖",
      "😗",
      "😘",
      "😙",
      "😚",
      "😛",
      "😜",
      "😝",
      "😞",
      "😟",
      "😠",
      "😡",
      "😢",
      "😣",
      "😤",
      "😥",
      "😦",
      "😧",
      "😨",
      "😩",
      "😪",
      "😫",
      "😬",
      "😭",
      "😮",
      "😯",
      "😰",
      "😱",
      "😲",
      "😳",
      "😴",
      "😵",
      "😶",
      "😷",
      "🙁",
      "🙂",
      "🙃",
      "🙄",
      "🤐",
      "🤑",
      "🤒",
      "🤓",
      "🤔",
      "🤕",
      "🤠",
      "🤡",
      "🤢",
      "🤣",
      "🤤",
      "🤥",
      "🤧",
      "🤨",
      "🤩",
      "🤪",
      "🤫",
      "🤬",
      "🤭",
      "🤮",
      "🤯",
      "🧐"
    ]
  },
  mutations: {


    handlePushUser(state, TheUser) {
      // 这里避免同时登录两个
      state.user.push(TheUser);
    },
    changeName(state,u){
      // console.log(this.state.user.length);
      for(let i=0;i<state.user.length;i++){
        if(state.user[i].account==u.account){
          state.user[i].name=u.name
        }
      }
    },
    changeAvatar(state,u){
      // console.log(u);
      for(let i=0;i<state.user.length;i++){
        if(state.user[i].account==u.account){
          state.user[i].avatar=u.base64
        }
      }
    }



  },
  actions: {
  },
  modules: {
  }
})
