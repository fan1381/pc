import left from '@/components/home/aside'
import headers from '@/components/home/header'
import crumb from '@/components/mianbao'
export default {
  install (Vue) {
    Vue.component('left', left)
    Vue.component('headers', headers)
    Vue.component('crumb', crumb)
  }
}
