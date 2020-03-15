import left from '@/components/home/aside'
import headers from '@/components/home/header'

export default {
  install (Vue) {
    Vue.component('left', left)
    Vue.component('headers', headers)
  }
}
