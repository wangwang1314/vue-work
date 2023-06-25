import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout, getHome } from '@/apis'
import type { LoginParams, UserInfo } from '@/apis'
import { setToken, clearToken } from '@/utils/auth'

export type RoleType = '' | '*' | 'admin' | 'user'

interface UserState {
  userInfo: UserInfo
}
interface UserRes {
  code: number
  message: string
}
export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => {
    return {
      userInfo: JSON.parse(localStorage.getItem('UserInfo') as string) || {
        name: '',
        avatar: '',
        phone: '',
        registrationDate: '',
        accountId: '',
        role: '',
        homeInfo: undefined,
        loading: false,
        showMain: true
      }
    }
  },
  getters: {
    userName(): string {
      return this.userInfo.name
    }
  },
  actions: {
    // 登录
    async login(loginForm: LoginParams) {
      try {
        const res = (await userLogin(loginForm)) as UserRes
        // setToken(res.data.token)
        // this.userInfo = res.data.userInfo
        // localStorage.setItem('UserInfo', JSON.stringify(this.userInfo))
        if (res.code != 0) {
          throw new Error(res.message)
        }
      } catch (err) {
        clearToken()
        throw err
      }
    },
    // 退出登录
    async logout() {
      try {
        await userLogout()
        this.userInfo.homeInfo = undefined
        clearToken()
      } catch (err) {
        return err
      }
    },
    // 获取首页信息
    async getHomeinfo() {
      this.setLoading(true)
      try {
        const res = await getHome()
        this.setLoading(false)
        if (res.code == 0) {
          this.userInfo.homeInfo = res.data
        }
      } catch (err) {
        this.setLoading(false)
        return err
      }
    },
    // 设置loading
    setLoading(mode: boolean) {
      this.userInfo.loading = mode
    },
    // 设置显示
    setShowMain(mode: boolean) {
      this.userInfo.showMain = mode
    }
  }
})
