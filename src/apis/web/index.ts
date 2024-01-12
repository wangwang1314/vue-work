import axios from '@/utils/http'
import type {
  productdata,
  productparams,
  similarParams,
  PrListParams,
  PrFlagUp,
  PrFlagList,
  aiParams,
  aiRecommendRes,
  InquirylistParams,
  InquirylistRes,
  IndexflagParams,
  IndexflaglistRes
} from './type'
import qs from 'qs'
const baseURL = import.meta.env.VITE_API_BASE_AJAX
/** @desc 获取商品列表信息 */
export function getProductList(params: productparams) {
  return axios.get<ApiRes<productdata>>(`${baseURL}?r=product/list`, params)
}

/** @desc 相似度检测 */
export function checkSimilarity(params: similarParams) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/similarity-detection`, qs.stringify(params))
}

/** @desc 获取相似度数据 */
export function getSimilarity(params: similarParams) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=product/similarity-data`, params)
}

/** @desc 相似度通知 */
export function similarityReport() {
  return axios.get<ApiRes<null>>(`${baseURL}?r=notice/similarity-detection`)
}

/** @desc 删除产品接口 */
export function productDel(params: string[]) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/del`, qs.stringify(params))
}

/** @desc 恢复删除产品接口 */
export function productRecover(params: string[]) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/recover`, qs.stringify(params))
}

/** @desc 设为卖点产品 */
export function setHotspot(params: string[]) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/set-hotspot`, qs.stringify(params))
}

/** @desc 取消卖点产品 */
export function cancelHotspot(params: string[]) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/cancel-hotspot`, qs.stringify(params))
}

/** @desc 调整负责人 */
export function editUser(params: string[]) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/edit-user`, qs.stringify(params))
}

/** @desc 分类海关编码列表 */
export function cateHscode(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=category/list-hs-code`, params)
}

/** @desc 海关编码搜索 */
export function hscodeSearch(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=product/search-hs-code`, params)
}

/** @desc 海关编码检查 */
export function hscodeCheck(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=product/check-hs-code`, params)
}

/** @desc 设置海关编码 */
export function setHscode(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/edit-hs-code`, qs.stringify(params))
}
/** @desc 海关编码列表 */
export function allHscode(params) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=category/all-hs-code`, params)
}
/** @desc 设置分类海关编码 */
export function setCateHscode(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=category/set-hs-code`, qs.stringify(params))
}
/** @desc 分类调整 */
export function editCategory(params) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=product/edit-category`, qs.stringify(params))
}

/** @desc 优先展示产品列表 */
export function prFlagList(params: PrListParams) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=flag/list`, params)
}

/** @desc 优先展示排序上移 */
export function prFlagUp(params: PrFlagUp) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/up`, qs.stringify(params))
}

/** @desc 优先展示排序下移 */
export function prFlagDown(params: PrFlagUp) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/down`, qs.stringify(params))
}

/** @desc 优先展示排序置顶 */
export function prFlagTop(params: PrFlagUp) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/pin`, qs.stringify(params))
}

/** @desc 优先展示取消置顶 */
export function prFlagCancelTop(params: PrFlagUp) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/unpin`, qs.stringify(params))
}

/** @desc 优先展示置顶产品列表 */
export function prTopFlagList(params: PrListParams) {
  return axios.get<ApiRes<null>>(`${baseURL}?r=flag/list-flag`, params)
}

/** @desc 优先展示批量设置置顶产品 */
export function prFlagSet(params: PrFlagUp) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/sync`, qs.stringify(params))
}

/** @desc 优先展示页脚产品分类设置 */
export function prCateSet(params: PrFlagList) {
  return axios.post<ApiRes<null>>(`${baseURL}?r=flag/set-foot-cate`, qs.stringify(params))
}
/** @desc ai 计算自定义属性 */
export function aiRecommend(params: aiParams) {
  return axios.get<ApiRes<aiRecommendRes>>(`${baseURL}?r=ai/custom-attr-recommend`, params)
}

/** @desc 分类批量设置 */
export function prBatchSet(params: PrFlagList) {
  return axios.post<ApiRes<aiRecommendRes>>(`${baseURL}?r=product/batch-set`, qs.stringify(params))
}

/** @desc 分类批量删除属性 */
export function prBatchDel(params: PrFlagList) {
  return axios.post<ApiRes<aiRecommendRes>>(`${baseURL}?r=product/batch-del`, qs.stringify(params))
}
/** @desc 设置产品图片 */
export function prSavePicture(params: PrFlagList) {
  return axios.post<ApiRes<aiRecommendRes>>(`${baseURL}?r=product/save-picture`, qs.stringify(params))
}

/** @desc 获取导航信息 */
export function prWebsetNav(params: PrFlagList) {
  return axios.get<ApiRes<aiRecommendRes>>(`${baseURL}?r=webset/nav`, params)
}
/** @desc 保存导航信息 */
export function prWebsetSaveNav(params: PrFlagList) {
  return axios.post<ApiRes<aiRecommendRes>>(`${baseURL}?r=webset/save-nav`, qs.stringify(params))
}
/** @desc 获取商机列表 */
export function getInquiryList(params: InquirylistParams) {
  return axios.get<ApiRes<InquirylistRes>>(`${baseURL}?r=inquiry/list`, params)
}
/** @desc 置顶询盘 */
export function setindexflag(params: IndexflagParams) {
  return axios.get<ApiRes<IndexflaglistRes>>(`${baseURL}?r=inquiry/setindexflag`, params)
}
/** @desc 删除询盘 */
export function delInquiry(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=inquiry/del-inquiry`, params)
}
/** @desc 询盘详情 */
export function detailInquiry(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=inquiry/detail`, params)
}
/** @desc 智能询盘聊天详情 */
export function chatLists(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=inquiry/chat-lists`, params)
}
/** @desc 询盘翻译 */
export function translateInquiry(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=inquiry/translate-message`, qs.stringify(params))
}
/** @desc 询盘附件上传 */
export function addAttachment(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=inquiry/add-attachment`, qs.stringify(params))
}
/** @desc 询盘回复 */
export function inquiry(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=inquiry/reply`, qs.stringify(params))
}
/** @desc 重发询盘邮件 */
export function reSend(params: any) {
  return axios.get<ApiRes<any>>(`${baseURL}?r=inquiry/re-send`, params)
}
/** @desc 获取邮箱签名 */
export function getMailsign(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=inquiry/get-mailsign`, qs.stringify(params))
}
/** @desc 设置邮件签名 */
export function setMailsign(params: any) {
  return axios.post<ApiRes<any>>(`${baseURL}?r=inquiry/set-mailsign`, qs.stringify(params))
}
export * from './mod/addpro'
