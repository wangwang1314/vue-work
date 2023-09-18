import { DEFAULT_LAYOUT } from '../base'

const Banner = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/banner/list',
      name: 'banner',
      component: () => import('@/views/banner/list/index.vue'),
      meta: {
        title: '插图管理',
        keepAlive: false
      }
    }
  ]
}

export default Banner
