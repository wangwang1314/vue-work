import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import { Message, Notification } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router/index'
import { uc_login_sdk } from '@/utils/common'

const link = import.meta.env.VITE_API_LOCA + '?refresh=no'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

interface ICodeMessage {
  [propName: number]: string
}

const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)'
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
  timeout: 600 * 1000
})

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start() // 进度条
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { message, code } = data
    if (code == 401) {
      NProgress.done()
      router.push({ path: '/login' })
      Notification.error(message || '登录失效')
      uc_login_sdk.setCookie('PHP_SESSION_ID', '', -1)
      // uc_login_sdk.setCookie('app_ueid', '', -1)
      if (!uc_login_sdk.getUrlParam('refresh')) {
        location.href = 'https://uc.ecer.com/home/login?goto=' + encodeURIComponent(link)
      }
      return Promise.reject(new Error('Error'))
    }
    if (code == 999) {
      NProgress.done()
      if (!data.provetime) {
        router.push({ path: '/agreement' })
      } else {
        router.push({ path: '/guide1', query: { company: data.company_name } })
      }
      return response
    }
    if (code != 0) {
      NProgress.done()
      Notification.error(message || '服务器端错误')
      return response
    }
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    Message.clear()
    const response = Object.assign({}, error.response)
    response && Message.error(StatusCodeMessage[response.status] || '系统异常, 请检查网络或联系管理员！')
    return Promise.reject(error)
  }
)

const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    http
      .request<T>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = unknown>(url: string, params?: object, headers?: AxiosRequestHeaders): Promise<T> => {
  return request({
    method: 'get',
    url,
    params,
    headers
  })
}

request.post = <T = unknown>(url: string, params?: object, headers?: AxiosRequestHeaders): Promise<T> => {
  return request({
    method: 'post',
    url,
    data: params,
    headers
  })
}

export default request
