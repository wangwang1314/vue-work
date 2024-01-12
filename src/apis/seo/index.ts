import axios from '@/utils/http'
import type { productdata, productparams, similarParams, PrListParams, PrFlagUp, PrFlagList, aiParams, aiRecommendRes } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
const textstr = import.meta.env.VITE_API_GOOGLE
// /** @desc 签署协议 */
// export function guideProve(params) {
//   return axios.get<ApiRes<productdata>>(`${baseURL}?r=init/prove`, params)
// }

// /** @desc 保存公司名称 */
// export function guideCreatweb(params) {
//   return axios.post<ApiRes<null>>(`${baseURL}?r=init/creatweb`, qs.stringify(params))
// }

/** @desc 获取方案价格 */
export function seogetprice(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=ai-publish/get-price`, params)
}

/** @desc 开通服务 */
export function seoopenaiservice(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=ai-publish/open-ai-service`, params)
}

/** @desc 首页分类SEO */
export function seolist(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=seo/list`, params)
}

/** @desc 设置seo启动 */
export function seoopseo(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=seo/opseo`, params)
}

/** @desc 获取google搜索排名详情 */
export function seorankgoogle(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=${textstr}/google`, params)
}

/** @desc 下载google搜索报告 */
export function seodownloadgoogle(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=${textstr}/download-google-report`, params)
}

/** @desc 视频排名 */
export function seorankvideo(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=${textstr}/video`, params)
}

/** @desc 下载视频搜索报告 */
export function seodownloadvideo(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=${textstr}/download-video-report`, params)
}