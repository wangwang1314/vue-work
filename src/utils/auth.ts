import { uc_login_sdk } from '@/utils/common'
const TOKEN_KEY = 'token'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  uc_login_sdk.setCookie('PHP_SESSION_ID', '', -1)
  uc_login_sdk.setCookie('app_ueid', '', -1)
}

export { isLogin, getToken, setToken, clearToken }
