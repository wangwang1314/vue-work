import axios from '@/utils/http'
import type { productdata, productparams, similarParams, PrListParams, PrFlagUp, PrFlagList, aiParams, aiRecommendRes } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 签署协议 */
export function guideProve(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=index/prove`, params)
}

/** @desc 保存公司名称 */
export function guideCreatweb(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/creatweb`, qs.stringify(params))
}

/** @desc 录入方式校验 */
export function guideDataurlcheck(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/dataurlcheck`, qs.stringify(params))
}

/** @desc 保存数据导入方式 */
export function guideDatafrom(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/datafrom`, qs.stringify(params))
}

/** @desc 跳过 */
export function guidejump(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/jump`, params)
}