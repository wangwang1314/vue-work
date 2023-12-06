import { DEFAULT_LAYOUT } from '../base'

const Overview = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/overview',
      name: 'Overview',
      component: () => import('@/views/overview/index.vue'),
      meta: {
        title: '概况',
        keepAlive: false
      }
    }
  ]
}

export default Overview
