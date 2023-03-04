import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from './router'
import store from './store'
import * as echarts from 'echarts'


// import socket from './plugin/socket'
// app.config.globalProperties.$socket = socket;

require('echarts-wordcloud')
const app = createApp(App)
app.use(router)
app.use(store)



// import VueSocketIO from 'vue-socket.io'
// new VueSocketIO({
//     debug: true, // debug调试，生产建议关闭
//     connection: "http://127.0.0.1:3000",
//     options: {     //Optional options, 
//         autoConnect: true, //关闭自动连接，在用户登录后在连接。
//     }
// })




app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
app.mount('#app')

//http://127.0.0.1:80