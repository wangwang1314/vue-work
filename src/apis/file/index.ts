import axios from '@/utils/http'
import type { } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX

/** @desc 获取案例列表 */
export function fileCaseList(prams: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=case/list`, prams)
}
/** @desc 编辑表单初始化 */
export function fileCaseInit(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=case/init`, params)
}
/** @desc 编辑案例 */
export function fileCaseEdit(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/edit`, qs.stringify(params))
}
/** @desc 新增案例 */
export function fileCaseAdd(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/add`, qs.stringify(params))
}
/** @desc 删除案例 */
export function fileCaseDel(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/del`, qs.stringify(params))
}
/** @desc 新增页面 */
export function fileAddPage(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/add-page`, qs.stringify(params))
}
/** @desc 编辑页面 */
export function fileEditPage(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/edit-page`, qs.stringify(params))
}
/** @desc 删除页面 */
export function fileDelPage(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/del-page`, qs.stringify(params))
}
/** @desc 新增分类 */
export function fileAddCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/add-category`, qs.stringify(params))
}
/** @desc 编辑分类 */
export function fileEditCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/edit-category`, qs.stringify(params))
}
/** @desc 删除分类 */
export function fileDelCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/del-category`, qs.stringify(params))
}
/** @desc 排序上移 */
export function fileCaseUp(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/up`, qs.stringify(params))
}
/** @desc 排序下移 */
export function fileCaseDown(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=case/down`, qs.stringify(params))
}

/** @desc 获取新闻列表 */
export function fileNewsList(prams: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=news/list`, prams)
}
/** @desc 新闻表单初始化 */
export function fileNewsInit(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=news/init`, params)
}
/** @desc 新增新闻 */
export function fileNewsAdd(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/add`, qs.stringify(params))
}
/** @desc 删除新闻 */
export function fileNewsDel(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/del`, qs.stringify(params))
}
/** @desc 编辑新闻 */
export function fileNewsEdit(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/edit`, qs.stringify(params))
}
/** @desc 新闻排序上移 */
export function fileNewsUp(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/up`, qs.stringify(params))
}
/** @desc 新闻排序下移 */
export function fileNewsDown(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/down`, qs.stringify(params))
}
/** @desc 新闻新增分类 */
export function fileNewsAddCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/add-category`, qs.stringify(params))
}
/** @desc 新闻编辑分类 */
export function fileNewsEditCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/edit-category`, qs.stringify(params))
}
/** @desc 新闻删除分类 */
export function fileNewsDelCategory(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=news/del-category`, qs.stringify(params))
}