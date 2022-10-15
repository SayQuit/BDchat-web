import { createStore } from 'vuex'

export default createStore({
  state: {
    requestUrl: 'http://127.0.0.1:80',

    // 存储用户信息
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
      {name:'倾斜',style:'oblique'},
    ],
    textDecoration:[
      {name:'默认',style:'none'}, 
      {name:'上划线',style:'overline'},   
      {name:'穿行线',style:'line-through'},
      {name:'下划线',style:'underline'},

    ],
    fontWeight:[
      100,200,300,400,500,600,700,800,900
    ],
    mood:[
      {
        link:require('../assets/Anger.png'),
        state:'生气',
        color:'F0494F'
      },
      {
        link:require('../assets/Surprise.png'),
        state:'惊讶',
        color:'F47B39'

      },
      {
        link:require('../assets/Happy.png'),
        state:'快乐',
        color:'F4E932'
      },
      {
        link:require('../assets/Trust.png'),
        state:'信任',
        color:'A5FD3C'
      },
      {
        link:require('../assets/Fear.png'),
        state:'害怕',
        color:'34B5A9'
      },
      {
        link:require('../assets/Expectations.png'),
        state:'期待',
        color:'33B4D6'
      },
      {
        link:require('../assets/Sadness.png'),
        state:'悲伤',
        color:'3477B7'
      },
      {
        link:require('../assets/Disgust.png'),
        state:'厌倦',
        color:'B869AD'
      },
    ]
  },
  mutations: {
    handlePushUser(state, TheUser) {
      state.user.push(TheUser);
    },

    // 改名更新
    changeName(state,u){
      for(let i=0;i<state.user.length;i++){
        if(state.user[i].token==u.token){
          state.user[i].name=u.name
        }
      }
    },

    // 改头像更新
    changeAvatar(state,u){
      for(let i=0;i<state.user.length;i++){
        if(state.user[i].token==u.token){
          state.user[i].avatar=u.base64
        }
      }
    },

    // 退出账号，删除localStorage的对应token和用户信息
    logout(state,token){
      for(let i=0;i<state.user.length;i++){
        if(token==state.user[i].token){
          state.user.splice(i,1)
          break;
        }
      }     
      let TokenList=[]
      if(localStorage.getItem('bd_chat_token'))TokenList=JSON.parse(localStorage.getItem('bd_chat_token'))

      for(let i=0;i<TokenList.length;i++){
        if(token==TokenList[i]){
          TokenList.splice(i,1)
          break;
          
        }
      } 
      localStorage.setItem('bd_chat_token',JSON.stringify(TokenList));
    }



  },
  actions: {
  },
  modules: {
  }
})
