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
    ],
    fontFamily:[
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      "'Courier New', Courier, monospace",
      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      "'Times New Roman', Times, serif",
      "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      "Arial, Helvetica, sans-serif",
      "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
      "Georgia, 'Times New Roman', Times, serif",
      "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      "Verdana, Geneva, Tahoma, sans-serif",
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"    
    ],
    fontStyle:[
      {name:'普通',style:'normal'},
      // {name:'italic',style:'italic'},
      {name:'倾斜',style:'oblique'},
    ],
    textDecoration:[
      {name:'none',style:'none'},
      {name:'dashed',style:'dashed'},
      {name:'dotted',style:'dotted'},
      {name:'double',style:'double'},
      {name:'line-through',style:'line-through'},
      {name:'overline',style:'overline'},
      {name:'solid',style:'solid'},
      {name:'underline',style:'underline'},
      {name:'wavy',style:'wavy'},

    ],
    fontWeight:[
      100,200,300,400,500,600,700,800,900
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
