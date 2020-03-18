import axios from 'axios'
import router from '../router'
import {
  Message
} from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {})

// 处理大数字类型
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      window.localStorage.removeItem('user-token') // 删除过期的token
      router.push('/login') // 跳转到登录页
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }

  Message({
    type: 'warning',
    message
  })

  return Promise.reject(error) // 错误执行函数做一下延续处理，不然还会进到then中
})
export default axios
