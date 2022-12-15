import axios from 'axios'
import { ElMessage } from 'element-plus'

const api = axios.create({
  // 设置请求的基础路径
  baseURL: process.env.VUE_APP_API_URL,
  // 设置超时时间
  timeout: 3000,
  headers: {
    // 设置请求头为form格式，utf-8编码
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    return config
  },
  err => {
    // 请求发生错误时的相关处理 抛出错误
    return Promise.reject(err)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 数据中的自定义code是否为200
    // 不是则是用ELMessage弹出数据中的msg错误信息
    if (response.data?.code) {
      if (response.data.code !== 200) {
        ElMessage({
          message: response.data.msg,
          duration: 1500,
          type: 'error'
        })
        return response.data
      } else {
        return response.data
      }
    } else {
      return response.data
    }
  },
  err => {
    // 响应错误处理
    return Promise.reject(err)
  }
)

export default api
