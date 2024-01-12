import { DEFAULT_LAYOUT } from '../base'

const Apps = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/apps/list',
      name: 'apps',
      component: () => import('@/views/apps/list.vue'),
      meta: {
        title: '应用市场',
        keepAlive: false
      }
    },
    {
      path: '/apps/detail1',
      name: 'appsdetail1',
      component: () => import('@/views/apps/detail/detail1.vue'),
      meta: {
        title: 'SSL安全认证',
        keepAlive: false
      }
    },
    {
      path: '/apps/detail2',
      name: 'appsdetail2',
      component: () => import('@/views/apps/detail/detail2.vue'),
      meta: {
        title: '企业邮箱',
        keepAlive: false
      }
    },
    {
      path: '/apps/detail3',
      name: 'appsdetail3',
      component: () => import('@/views/apps/detail/detail3.vue'),
      meta: {
        title: '小语种',
        keepAlive: false
      }
    },
  ]
}

export default Apps
