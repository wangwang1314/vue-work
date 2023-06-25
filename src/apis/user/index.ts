import axios from '@/utils/http'
import type { LoginRes } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 登录 */
export type LoginParams = { username: string; password: string }
export function login(data: LoginParams) {
  return axios.post(`${baseURL}?r=user/login`, qs.stringify(data))
}

/** @desc 退出登录 */
export function logout() {
  return axios.post(`${baseURL}?r=user/logout`)
}

/** @desc 获取动态菜单 */
export function getMenuList() {
  return axios.get(`/user/menu`)
}

/** @desc 获取动态菜单 */
export function apiChangeLang(params) {
  return axios.post(`${baseURL}?r=index/change-lang`, qs.stringify(params))
}
