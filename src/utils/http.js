import axios from 'axios'
import router from '@/router'
import {message} from "ant-design-vue";
import 'ant-design-vue/es/message/style/index.css'

const toLogin = () => {
  router.push({
    path: '/login'
  })
}

const code = (code) => {
  switch (code) {
    case 401:
      message.error('未授权')
      toLogin()
      break;
    case 403:
      message.error('Token过期，请重新登录')
      sessionStorage.removeItem('blog_token')
      toLogin()
      break;
    case 404:
      message.error('页面未找到')
      break;
    default:
      message.error('这里有一丢丢错误')
  }
}

const instance = axios.create({
  timeout: 100000
})

export const baseUrl = 'http://localhost:9090'

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('blog_token')) {
      config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('blog_token')
    }
    return config
  },
  error => {
    message.error(error)
    return Promise.reject(error + '错误')
  }
)

instance.interceptors.response.use(
  res => {
    if (res.status === 200 || res.data.code === 200) {
      message.success(res.data.message)
      return Promise.resolve(res)
    } else {
      message.error(res.data.message)
      return Promise.reject(res)
    }
  },
  error => {
    const {res} = error
    if (res) {
      code(res.status, res.data.code)
      return Promise.reject(res)
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance