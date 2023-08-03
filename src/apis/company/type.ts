interface infoObj {
  market_name: Array<string>
  business_type: Array<string>
  partnersinfo: string
  brands: string
  employee_number: Array<string>
  annual_sales: Array<string>
  year_established: string
  export_ratio: string
  customers_served: string
}
interface company {
  name: string
  type: string
  id: string
  color: string
  slogan: string
  videoid: string
  logopath: string
  inc_video: boolean
  video_info: Array<any>
  info: infoObj
  picture_info: Array<any>
  detail: Array<any>
  market: Array<string>
  business_type: Array<string>

}
export interface ComInfo {
  company: company
}

export interface ComType {
  type: string
}

export interface ComSave {
  type: string
  remark: string
  brief: string
}

export interface advSave {
  advantage: Array<any>
}

export interface partnerSave {
  partnersinfo: string
  picture_info: Array<any>
}

export interface leaveWord {
  leave_word: Array<any>
}

export interface factoryParams {
  type: 'plineinfo' | 'oeminfo' | 'rdinfo'
}

export interface saveFactory {
  type: 'plineinfo' | 'oeminfo' | 'rdinfo'
  remark: string
  picture_info: Array<any>
}