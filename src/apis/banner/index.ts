import axios from '@/utils/http'
import type { CateParams, BannerData, AddBanner, DelBanner, AddKeyBanner, EditBanner } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 获取首页banner */
export function getHomeBanner() {
  return axios.get<ApiRes<BannerData>>(`${baseURL}?r=inset/home-banner`)
}
/** @desc 保存首页banner */
export function saveHomeBanner(params: AddBanner) {
  return axios.post<ApiRes<BannerData>>(`${baseURL}?r=inset/save-home-banner`, qs.stringify(params))
}
/** @desc 获取内页banner */
export function getInnerBanner() {
  return axios.get<ApiRes<BannerData>>(`${baseURL}?r=inset/inner-banner`)
}
/** @desc 保存内页banner */
export function saveInnerBanner(params: EditBanner) {
  return axios.post<ApiRes<BannerData>>(`${baseURL}?r=inset/save-inner-banner`, qs.stringify(params))
}
/** @desc 获取跳转链接 */
export function getLink(params: AddKeyBanner) {
  return axios.get<ApiRes<BannerData>>(`${baseURL}?r=inset/get-link`, params)
}

/** @desc 设置跳转链接 */
export function setLink(params) {
  return axios.post<ApiRes<BannerData>>(`${baseURL}?r=inset/set-link`, qs.stringify(params))
}

/** @desc 获取网站插图*/
export function getWebInset(params) {
  return axios.get<ApiRes<BannerData>>(`${baseURL}?r=inset/inset`, params)
}

/** @desc 保存网站插图*/
export function setWebInset(params) {
  return axios.post<ApiRes<BannerData>>(`${baseURL}?r=inset/save-inset`, qs.stringify(params))
}

