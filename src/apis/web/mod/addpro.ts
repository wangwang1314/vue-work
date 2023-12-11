import axios from '@/utils/http'
import type { productdata, productparams, similarParams } from '../type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX

/** @desc 产品发布初始化 */
export function proPublishInit(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=product/publish-init`, params)
}

/** @desc 图片中心获取图片列表 */
export function proPicList(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=picture/list`, params)
}
/** @desc 调整图片分组 */
export function proAdjustGroup(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=picture/adjust-group`, qs.stringify(params))
}
/** @desc 删除图片*/
export function proMultiDel(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=picture/multi-del`, qs.stringify(params))
}
/** @desc 图片打包*/
export function proPicArchive(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=picture/archive`, qs.stringify(params))
}
/** @desc 图片下载*/
export function proPicDownload(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=picture/download`, qs.stringify(params))
}
/** @desc 删除视频*/
export function proVideoDel(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=video/del`, qs.stringify(params))
}
/** @desc 删除文档*/
export function proDocumentDel(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=document/del`, qs.stringify(params))
}
/** @desc 视频中心获取视频列表 */
export function provideList(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=video/list`, params)
}

/** @desc 文档心获取文档列表 */
export function profileList(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=document/list`, params)
}

/** @desc 新增产品描述模板 */
export function proAddTpl(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=product/add-remark-tpl`, qs.stringify(params))
}

/** @desc 获取模板内容 */
export function progetTplContent(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=product/tpl-content`, params)
}

/** @desc 卖点词智能推荐 */
export function progethotKeyword(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=product/hot-keyword`, qs.stringify(params))
}

/** @desc 属性推荐 */
export function progetAttr(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=product/attr-recommend`, params)
}

/** @desc 页面发布新增 */
export function proAddProduct(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=product/add`, qs.stringify(params))
}

/** @desc 页面发布编辑 */
export function proEditProduct(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=product/publish`, qs.stringify(params))
}

/** @desc 获取视频详情 */
export function getVideoDetail(params) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=video/info`, params)
}

/** @desc 设置产品头图视频 */
export function setProVideo(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=video/set-product-video`, qs.stringify(params))
}

/** @desc 视频广告开关 */
export function setVideoSwitch(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=video/ad-switch`, qs.stringify(params))
}

/** @desc 视频发布至youtube */
export function pubYoutube(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=video/sync-youtube`, qs.stringify(params))
}

/** @desc 视频信息编辑 */
export function setVideoEdit(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=video/edit`, qs.stringify(params))
}

/** @desc 信息质量检测 */
export function qualityControl(params) {
  return axios.post<ApiRes<productdata>>(`${baseURL}?r=product/quality-control`, qs.stringify(params))
}