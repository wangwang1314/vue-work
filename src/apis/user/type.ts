import type { homePage } from '@/apis'
export interface UserInfo {
  name: string
  avatar: string
  email: string
  phone: string
  registrationDate: string
  accountId: string
  role: string
  homeInfo: undefined | homePage
  loading: boolean
  showMain: boolean
}

export interface LoginRes {
  token: string
  userInfo: UserInfo
}
