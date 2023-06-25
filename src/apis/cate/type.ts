export interface CateItem {
  id: string
  name: string
  parentid: string
  level: string
  productcount: string
  uptime: string
  optimize_count: string
  optimize_exists: boolean
  keyword: [string]
  [propName: string]: any // 一个 interface 中任意属性只能有一个
}

export interface CateParams {
}
export interface CateData {
  list: Array<CateItem>
  total_record: number
  full_edit: boolean
  soid: number | string
}

export interface AddCate {
  name: string
  parent_id: string
}
export interface EditCate {
  name: string
  category_id: string
}
export interface DelCate {
  category_ids: Array<string>
}

export interface AddKey {
  keyword: Array<string>
  category_id: string
}

export interface SeoParams {
  seo_sid?: string
  seo_page?: string | number
  seo_title?: string
  seo_desc?: string
  seo_keyword?: string
}
