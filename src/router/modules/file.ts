import { DEFAULT_LAYOUT } from '../base'

const File = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/file/news',
      name: 'News',
      component: () => import('@/views/file/news/index.vue'),
      meta: {
        title: '新闻中心',
        keepAlive: false
      }
    },
    {
      path: '/file/newsdetail',
      name: 'NewsDetail',
      component: () => import('@/views/file/news/detail/index.vue'),
      meta: {
        title: '新闻详细页',
        keepAlive: false
      }
    },
    {
      path: '/file/case',
      name: 'Case',
      component: () => import('@/views/file/case/index.vue'),
      meta: {
        title: '案例中心',
        keepAlive: false
      }
    },
    {
      path: '/file/casedetail',
      name: 'CaseDetail',
      component: () => import('@/views/file/case/detail/index.vue'),
      meta: {
        title: '案例详细页',
        keepAlive: false
      }
    },
    {
      path: '/file/faqs',
      name: 'Faqs',
      component: () => import('@/views/file/faqs/index.vue'),
      meta: {
        title: '案例中心',
        keepAlive: false
      }
    },
    {
      path: '/file/faqsdetail',
      name: 'FaqsDetail',
      component: () => import('@/views/file/faqs/detail/index.vue'),
      meta: {
        title: '案例详细页',
        keepAlive: false
      }
    },
    {
      path: '/file/custom',
      name: 'Custom',
      component: () => import('@/views/file/custom/index.vue'),
      meta: {
        title: '自定义页面',
        keepAlive: false
      }
    },
    {
      path: '/file/customdetail',
      name: 'CustomDetail',
      component: () => import('@/views/file/custom/detail/index.vue'),
      meta: {
        title: '自定义详细页',
        keepAlive: false
      }
    }
  ]
}

export default File
