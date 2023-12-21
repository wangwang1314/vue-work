import axios from '@/utils/http'
import type { ComInfo, ComType, ComSave, advSave, partnerSave, leaveWord, factoryParams, saveFactory } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX

/** @desc 获取公司基本信息 */
export function companyInfo() {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/base-info`, {})
}
/** @desc 编辑保存基本信息 */
export function companySave(params: ComInfo) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=company/save-info`, qs.stringify(params))
}
/** @desc 获取公司信息内容 */
export function companyTypeInfo(params: ComType) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/ext-info`, params)
}
/** @desc 编辑保存公司信息内容 */
export function saveCompanyTypeInfo(params: ComSave) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-ext-info`, qs.stringify(params))
}
/** @desc 获取公司优势 */
export function getCompanyAdv() {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/advantage`, {})
}
/** @desc 保存公司优势 */
export function saveCompanyAdv(params: advSave) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-advantage`, qs.stringify(params))
}
/** @desc 获取合作伙伴信息 */
export function getCompanyPartner() {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/partner`, {})
}
/** @desc 保存合作伙伴信息 */
export function saveCompanyPartner(params: partnerSave) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-partner`, qs.stringify(params))
}
/** @desc 获取客户赠言 */
export function getCompanyLeaveWord() {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/leave-word`, {})
}
/** @desc 保存客户赠言 */
export function saveCompanyLeaveWord(params: leaveWord) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-leave-word`, qs.stringify(params))
}
/** @desc 获取工厂展示 */
export function getCompanyFactory(params: factoryParams) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/factory`, params)
}
/** @desc 保存工厂信息 */
export function saveCompanyFactory(params: saveFactory) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-factory`, qs.stringify(params))
}

/** @desc 删除图片关联 */
export function pictureDdel(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=picture/del`, qs.stringify(params))
}

/** @desc 获取隐私协议 */
export function companyprivacypolicy(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/privacy-policy`, params)
}

/** @desc 保存隐私协议 */
export function companysaveprivacypolicy(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-privacy-policy`, qs.stringify(params))
}

/** @desc 获取访问设置 */
export function companygetlanguage(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=webset/language`, params)
}

/** @desc 保存访问设置 */
export function companysavelanguage(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=webset/set-language`, qs.stringify(params))
}

/** @desc 获取网站icon */
export function companywebseticon(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=webset/icon`, params)
}

/** @desc 删除网站icon */
export function companywebsetdelicon(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=webset/del-icon`, qs.stringify(params))
}

/** @desc 获取流量统计 */
export function companygetstatistic(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=webset/statistic`, params)
}

/** @desc 保存流量统计 */
export function companysetstatistic(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=webset/save-statistic`, qs.stringify(params))
}

/** @desc 获取质量控制信息 */
export function companyqc(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/qc`, params)
}

/** @desc 保存质量控制信息 */
export function companysaveqc(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-qc`, qs.stringify(params))
}

/** @desc 删除证书 */
export function companydelqc(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/del-certificate`, qs.stringify(params))
}

/** @desc 获取联系信息 */
export function companycontactinfo(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/contact-info`, params)
}

/** @desc 保存联系信息
 */
export function companysavecontactinfo(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-contact-info`, qs.stringify(params))
}

/** @desc 设置默认联系人

 */
export function companysetdefaultcontact(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/set-default-contact`, qs.stringify(params))
}

/** @desc 设置默认联系人

 */
export function companydelcontact(params) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/del-contact`, qs.stringify(params))
}

/** @desc 获取账号信息
*/
export function companyaccountinfo(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=account/info`, params)
}

/** @desc 获取聊天配置

*/
export function companywebimconfig(params) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=index/webim-config`, params)
}