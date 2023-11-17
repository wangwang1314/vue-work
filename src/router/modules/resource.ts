import { DEFAULT_LAYOUT } from '../base'

const Resource = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/resource/list',
      name: 'Resource',
      component: () => import('@/views/resource/list/index.vue'),
      meta: {
        title: '资源中心',
        keepAlive: false
      }
    }
  ]
}
export default Resource
