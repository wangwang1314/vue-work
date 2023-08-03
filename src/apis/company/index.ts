import axios from '@/utils/http'
import type { ComInfo, ComType, ComSave, advSave, partnerSave, leaveWord, factoryParams, saveFactory } from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX

/** @desc 获取公司基本信息 */
export function companyInfo() {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/info`, {})
}
/** @desc 编辑保存基本信息 */
export function companySave(params: ComInfo) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=company/save-info`, qs.stringify(params))
}
/** @desc 获取公司信息内容 */
export function companyTypeInfo(params: ComType) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/company-info`, params)
}
/** @desc 编辑保存公司信息内容 */
export function saveCompanyTypeInfo(params: ComSave) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-company-info`, qs.stringify(params))
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
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-leave-word`, params)
}
/** @desc 获取工厂展示 */
export function getCompanyFactory(params: factoryParams) {
  return axios.get<ApiRes<ComInfo>>(`${baseURL}?r=company/factory`, params)
}
/** @desc 保存工厂信息 */
export function saveCompanyFactory(params: saveFactory) {
  return axios.post<ApiRes<ComInfo>>(`${baseURL}?r=company/save-factory`, params)
}