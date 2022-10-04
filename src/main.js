import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from './router'
import store from './store'
import * as echarts from 'echarts'
require('echarts-wordcloud')
// import {global} from "@/global/index"
// Vue.prototype.global=global
const app = createApp(App)
app.use(router);
app.use(store)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
app.mount('#app')
