// const requestUrl='http://127.0.0.1:80';
// const user=[]

// export default {
//     requestUrl,
//     user

// };

import { createStore } from 'vuex'

export default createStore({
  state: {
    requestUrl:'http://127.0.0.1:80',
    user:[]
  },
  mutations: {
    handlePushUser(state,TheUser){
        state.user.push(TheUser);
    }
  },
  actions: {
  },
  modules: {
  }
})
