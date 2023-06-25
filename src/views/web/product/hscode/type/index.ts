export interface ItemList {
  parentid: string
  id: string
  children?: Array<ItemList>
}

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
