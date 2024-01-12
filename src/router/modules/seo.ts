import { DEFAULT_LAYOUT } from '../base'

const Seo = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/seo',
      name: 'seo',
      meta: {
        title: 'SEO服务',
        keepAlive: false
      },
      children: [
        {
          path: '/seo/ai',
          name: 'seoai',
          meta: {
            title: 'AI发布服务',
            keepAlive: false
          },
          component: () => import('@/views/seo/ai/index.vue')
        },
        {
          path: '/seo/google',
          name: 'seogoogle',
          meta: {
            title: 'Google搜索排名',
            keepAlive: false
          },
          component: () => import('@/views/seo/google/index.vue')
        },
        {
          path: '/seo/youtube',
          name: 'seoyoutube',
          meta: {
            title: 'YouTube排名',
            keepAlive: false
          },
          component: () => import('@/views/seo/youtube/index.vue')
        },
        {
          path: '/seo/tiktok',
          name: 'seotiktok',
          meta: {
            title: 'TikTok排名',
            keepAlive: false
          },
          component: () => import('@/views/seo/tiktok/index.vue')
        },
        {
          path: '/seo/cate',
          name: 'seocate',
          meta: {
            title: '首页分类SEO',
            keepAlive: false
          },
          component: () => import('@/views/seo/cate/index.vue')
        }
      ]
    }
  ]
}

export default Seo
