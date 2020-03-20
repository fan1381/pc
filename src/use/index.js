import left from '@/components/home/aside'
import headers from '@/components/home/header'
import crumb from '@/components/mianbao'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('left', left)
    Vue.component('headers', headers)
    Vue.component('crumb', crumb)
    Vue.component('quill-editor', quillEditor)
  }
}
