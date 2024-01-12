import { DEFAULT_LAYOUT } from '../base'

const Account = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/account/detail',
      name: 'account',
      component: () => import('@/views/account/index.vue'),
      meta: {
        title: '账户管理',
        keepAlive: false
      }
    },
    {
      path: '/integral/detail',
      name: 'integral',
      component: () => import('@/views/integral/index.vue'),
      meta: {
        title: '账户积分',
        keepAlive: false
      }
    },
    {
      path: '/integral/list',
      name: 'integrallist',
      component: () => import('@/views/integral/list.vue'),
      meta: {
        title: '积分账单',
        keepAlive: false
      }
    }
  ]
}

export default Account
