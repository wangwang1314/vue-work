import axios from '@/utils/http'
import type { productdata, productparams, similarParams, PrListParams, PrFlagUp, PrFlagList, aiParams, aiRecommendRes } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 签署协议 */
export function guideProve(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=init/prove`, params)
}

/** @desc 保存公司名称 */
export function guideCreatweb(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=init/creatweb`, qs.stringify(params))
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

/** @desc 数据导入情况说明 */
export function guidegetdataIntro(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getdataintro`, params)
}

/** @desc 数据导入状态 */
export function guidegetdatastate(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getdatastate`, params)
}

/** @desc 获取可选域名 */
export function guidegetpredomains(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getpredomains`, params)
}

/** @desc 获取数据 */
export function guidegetdata(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getdata`, params)
}

/** @desc 是否赠送域名 */
export function guidegetfreedomain(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getfreedomain`, params)
}

/** @desc 域名校验 */
export function guidedomaincheck(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/domaincheck`, qs.stringify(params))
}

/** @desc 申请上线(保存域名) */
export function guidedomainapply(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/domainapply`, qs.stringify(params))
}

/** @desc 相关许可或证明和备注保存 */
export function guidecompanyapply(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/companyapply`, qs.stringify(params))
}

/** @desc 相关许可或证明和备注保存 */
export function guidedomaininfos(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/domaininfos`, params)
}

/** @desc 域名配置校验上线 */
export function guidedomainconfigcheck(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=index/domainconfigcheck`, qs.stringify(params))
}

/** @desc 获取看板数据 */
export function guidepanel(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/panel`, params)
}


/** @desc 获取看板数据 */
export function guidereapply(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/reapply`, params)
}

/** @desc 当前步骤 */
export function guidegetnowstep(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/getnowstep`, params)
}

/** @desc 当前步骤 */
export function guidenextsetdomain(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/nextsetdomain`, params)
}

/** @desc 审核拒绝理由
 */
export function guiderefusereason(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=index/refusereason`, params)
}