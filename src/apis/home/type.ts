export interface homePage {
  total_commission: string
  ops_company_info: companyInfo
  company: companyuncheck
  user: user
}
interface companyInfo {
  points: number
}
interface companyuncheck {
  domain: string
  name: string
}
interface user {
  id: number
  name: string
  roleid: number
  email: string
}

