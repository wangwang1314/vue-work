export interface BannerItem {
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

export interface BannerData {
  list: Array<BannerItem>
  total_record: number
  full_edit: boolean
  soid: number | string
}
export interface AddBanner {
  home_banner: Array<bannerItem>
}
export interface bannerItem {
  id: string
  sort: string
  title: string
  picturedesc: string
  [propName: string]: string // 一个 interface 中任意属性只能有一个
}
export interface EditBanner {
  video_info?: {
    id: string
  }
  product_banner: {
    id: string
    type: string
  }
  news_banner: {
    id: string
    type: string
  }
  about_banner: {
    id: string
    type: string
  }
  contact_banner: {
    id: string
    type: string
  }
}
export interface DelBanner {
  category_ids: Array<string>
}

export interface AddKeyBanner {
  keyword: Array<string>
  category_id: string
}

