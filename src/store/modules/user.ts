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
    },
    goRoute(): string {
      if (this.userInfo.homeInfo && !this.userInfo.homeInfo.ecweb) {
        return '/agreement'
      } else if (this.userInfo.homeInfo && this.userInfo.homeInfo.company && !this.userInfo.homeInfo.company.name) {
        return '/guide1'
      } else if (this.userInfo.homeInfo && this.userInfo.homeInfo.ecweb && !this.userInfo.homeInfo.ecweb.datafrom && !this.userInfo.homeInfo.ecweb.jsjump) {
        return '/guide2'
      }
      return ''
    },
    getcheckstate(): number {
      return this.userInfo.homeInfo && this.userInfo.homeInfo.ecweb && this.userInfo.homeInfo.ecweb.checkstate
    },
    getdatafrom ():number {
      return this.userInfo.homeInfo && this.userInfo.homeInfo.ecweb && this.userInfo.homeInfo.ecweb.datafrom
    },
    getdomaintype():number {
      return this.userInfo.homeInfo && this.userInfo.homeInfo.ecweb && this.userInfo.homeInfo.ecweb.domaintype
    },
    getdataurl():number {
      return this.userInfo.homeInfo && this.userInfo.homeInfo.ecweb && this.userInfo.homeInfo.ecweb.dataurl
    },
    hasonline():number {
      return this.userInfo.homeInfo && this.userInfo.homeInfo.opscompanyinfo && this.userInfo.homeInfo.opscompanyinfo.status
    }
  },
  actions: {
    setcheckstate (state) {
      this.userInfo.homeInfo.ecweb.checkstate = state
    },
    // 登录
    async login(loginForm: LoginParams) {
      try {
        const res = (await userLogin(loginForm)) as UserRes
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
      try {
        const res = await getHome()
        if (res.code == 0) {
          this.userInfo.homeInfo = res.data
          this.hasinfo()
        }
      } catch (err) {
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
    },
    hasinfo() {},
    setOnlineState (val) {
      if (this.userInfo.homeInfo && this.userInfo.homeInfo.opscompanyinfo) {
        this.userInfo.homeInfo.opscompanyinfo.status = val
      }
    }
  }
})
