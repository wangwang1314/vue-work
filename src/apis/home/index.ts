import axios from '@/utils/http'
import type { homePage } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 获取首页信息 */
export function getHome() {
  return axios.get<ApiRes<homePage>>(`${baseURL}?r=index/index`)
}
