import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import component from './use/index'
import axios from './utils/request.js'
import './utils/beforeEach.js'

Vue.prototype.$axios = axios
Vue.use(elementUI)
Vue.use(component)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
