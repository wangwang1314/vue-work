import { DEFAULT_LAYOUT } from '../base'

const Data = {
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '/web',
      name: 'web', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
      meta: {
        title: '网站资料',
        keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
      },
      children: [
        {
          path: '/web/webproduct',
          name: 'webproduct', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          meta: {
            title: '产品管理',
            keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          },
          children: [
            {
              path: '/web/webproduct/list',
              name: 'productlist', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/product/main/index.vue'),
              meta: {
                title: '产品列表',
                keepAlive: true // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/webproduct/detail',
              name: 'productadd',
              component: () => import('@/views/web/product/detail/index.vue'),
              meta: {
                title: '产品发布',
                keepAlive: true
              }
            },
            {
              path: '/web/webproduct/orderlist',
              name: 'orderlist',
              component: () => import('@/views/web/product/orderlist/index.vue'),
              meta: {
                title: '优先展示',
                keepAlive: false
              }
            },
            {
              path: '/web/webproduct/proset',
              name: 'proset',
              component: () => import('@/views/web/product/proset/index.vue'),
              meta: {
                title: '批量设置',
                keepAlive: false
              }
            },
            {
              path: '/web/webproduct/hscode',
              name: 'hscode',
              component: () => import('@/views/web/product/hscode/index.vue'),
              meta: {
                title: '海关编码',
                keepAlive: true
              }
            }
          ]
        },
        {
          path: '/web/webcate',
          name: 'webcate', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          meta: {
            title: '分类管理',
            keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          },
          children: [
            {
              path: '/web/webcate/list',
              name: 'catelist', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/cate/list.vue'),
              meta: {
                title: '分类列表',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/webcate/edit',
              name: 'cate', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/cate/add.vue'),
              meta: {
                title: '分类编辑',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            }
          ]
        }
      ]
    }
  ]
}

export default Data
