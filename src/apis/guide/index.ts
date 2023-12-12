import axios from '@/utils/http'
import type { productdata, productparams, similarParams, PrListParams, PrFlagUp, PrFlagList, aiParams, aiRecommendRes } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 获取商品列表信息 */
export function getProductList(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=product/list`, params)
}

/** @desc 相似度检测 */
export function checkSimilarity(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/similarity-detection`, qs.stringify(params))
}


