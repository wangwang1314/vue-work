// 网站资料
export interface webSelectObj {
  keys: (number | string)[]
}
export interface productdata {
  list: []
  total_records: string
  p_users: proPersonItem[]
  categories: procateItem[]
}

export interface productparams {
  page_no: number
  page_size: number
  category_id?: string
  hs_code: string // 海关编码，1跟随分类，2单独指定
  pid_id?: number // 图片id
  video_id?: number // 视频id
  p_uid: string // 负责人id
  status?: string // 产品状态，1已删除，0正常
  order_by?: string // 发布时间addtime和更新uptime，默认更新时间
  order?: string // desc倒序，asc升序，默认desc
  search_name: string // 搜索词
  p_type?: string // 1卖点产品，0非卖点产品
  product_id?: string // 产品id
}

export interface productListItem {
  id: string
  cid: string
  cateid: string
  picid: string
  uid: string
  name: string
  keyword: keyword[]
  remark: string
  status: string
  addtime: string
  uptime: string
  indexflag: string
  cateflag: string
  type: string
  src_pid: string
  src_cateid: string
  src_cid: string
  src_type: string
  sort: string
  ptype: string
  relatepid: string
  extattrs: string | null
  src_info: string | null
  videoid: string
  p_username: string | null
  category_name: string
  category_level: string
  picture_path: string
  has_photo: boolean
  precise_keywords: Array<string>
  hscode: string
  hscode_pass: string
  prod_env_url: string
  hs_code: string
}

interface keyword {
  name: string
  value: string
}

export interface proPersonItem {
  id: string
  username: string
}

export interface procateItem {
  id: string
  name: string
}

export interface similarParams {
  product_id: string
}

export interface PrListParams {
  PrListParams: string
  page_size: string
  flag_type: string // 1首页置顶，2top product，3页脚左侧，4页脚中部，5页脚右侧
  search_name?: string
  category_id?: string
  p_uid?: string
}

export interface PrFlagUp {
  flag_type: string
  product_id: string
}

export interface PrFlagList {
  flag_type: string
  product_ids: Array<string>
}
