import axios from '@/utils/http'
import type { CateParams, CateData, AddCate, DelCate, AddKey, EditCate, SeoParams } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 获取分类列表信息 */
export function getCategoryList(params) {
  return axios.get<ApiRes<CateData>>(`${baseURL}?r=category/list`, params)
}
/** @desc 新建分类 */
export function addCategory(params: AddCate) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/save`, qs.stringify(params))
}
/** @desc 删除分类 */
export function delCategory(params: DelCate) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/del`, qs.stringify(params))
}
/** @desc 编辑分类 */
export function editCateName(params: EditCate) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/edit`, qs.stringify(params))
}
/** @desc 添加关键字 */
export function addCateKeyword(params: AddKey) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/add-keyword`, qs.stringify(params))
}

/** @desc 重置seo */
export function resetSeo(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/reset-seo`, qs.stringify(params))
}

/** @desc 编辑seo*/
export function setSeo(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/set-seo`, qs.stringify(params))
}

/** @desc 获取seo*/
export function getSeo(params: SeoParams) {
  return axios.get<ApiRes<CateData>>(`${baseURL}?r=category/get-seo`, params)
}

/** @desc 分类表单初始化*/
export function getCateDetail(params: SeoParams) {
  return axios.get<ApiRes<CateData>>(`${baseURL}?r=category/init`, params)
}

/** @desc [新增|编辑]分类介绍*/
export function saveCateIntro(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/save-intro`, qs.stringify(params))
}

/** @desc 删除分类介绍*/
export function delCateIntro(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/del-intro`, qs.stringify(params))
}



/** @desc 分类编辑*/
export function editCateContent(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/edit`, qs.stringify(params))
}

/** @desc 获取介绍列表*/
export function getCateTntro(params: SeoParams) {
  return axios.get<ApiRes<CateData>>(`${baseURL}?r=category/list-intro`, params)
}

/** @desc 导入制作方案*/
export function categoryImport(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/import`, qs.stringify(params))
}

/** @desc 分类排序*/
export function categorysort(params: SeoParams) {
  return axios.post<ApiRes<CateData>>(`${baseURL}?r=category/adjust-sort`, qs.stringify(params))
}

