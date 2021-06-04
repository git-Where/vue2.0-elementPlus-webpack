import Vue from 'vue'

import App from './App.vue'

import router from './router'

import store from './store' // 状态管理

import 'normalize.css' // 重置不同浏览器之间的标签默认样式

import '@/libs/element' // 按需引入element

import '@/styles/index.less' // 引入全局样式

import './permission' // permission control

import wsCache from '@/cache' // 本地存储

import '@/components' // 引入全局组件

import * as filters from '@/utils' // 引入全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import { ResetMessage } from '_c/ResetMessage' // 引入自定义message配置

Vue.prototype.$wsCache = wsCache
Vue.prototype.$message = ResetMessage

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
