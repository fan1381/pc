import left from '@/components/home/aside'
import headers from '@/components/home/header'
import crumb from '@/components/mianbao'
// import routerView from '@/views/comment/index'
export default {
  install (Vue) {
    Vue.component('left', left)
    Vue.component('headers', headers)
    Vue.component('crumb', crumb)
    // Vue.component('router-view', routerView)
  }
}
