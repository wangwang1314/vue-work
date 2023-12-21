import { DEFAULT_LAYOUT } from '../base'

const Webadd = {
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
          path: '/web/inquiry',
          name: 'inquiry', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          meta: {
            title: '商机',
            keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          },
          component: () => import('@/views/inquiry/main/index.vue')
        },
        {
          path: '/web/inquiry/detail',
          name: 'inquiryDetail',
          component: () => import('@/views/inquiry/detail/index.vue'),
          meta: {
            title: '商机详情',
            keepAlive: true
          }
        },
        {
          path: '/web/inquiry/reply',
          name: 'inquiryReply',
          component: () => import('@/views/inquiry/reply/index.vue'),
          meta: {
            title: '商机回复',
            keepAlive: true
          }
        },
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
          path: '/web/company',
          name: 'webcompany', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          meta: {
            title: '公司资料',
            keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          },
          children: [
            {
              path: '/web/company/intro',
              name: 'webcompanyintro', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/main/index.vue'),
              meta: {
                title: '基础信息',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/contact',
              name: 'webcompanycontact', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/contact/index.vue'),
              meta: {
                title: '联系信息',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/adv',
              name: 'webcompanyadv', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/adv/index.vue'),
              meta: {
                title: '公司优势',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/brand',
              name: 'webcompanybrand', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/brand/index.vue'),
              meta: {
                title: '合作品牌',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/message',
              name: 'webcompanymessage', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/message/index.vue'),
              meta: {
                title: '客户赠言',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/factory',
              name: 'webcompanyfactory', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/factory/index.vue'),
              meta: {
                title: '工厂展示',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/quality',
              name: 'webcompanyquality', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/quality/index.vue'),
              meta: {
                title: '质量认证',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/policy',
              name: 'webcompanypolicy', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/policy/index.vue'),
              meta: {
                title: '隐私协议',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/icon',
              name: 'webcompanyicon', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/icon/index.vue'),
              meta: {
                title: '网站小图标',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/language',
              name: 'webcompanylanguage', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/language/index.vue'),
              meta: {
                title: '访问设置',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/statistic',
              name: 'webcompanystatistic', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/statistic/index.vue'),
              meta: {
                title: '自定义代码',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              }
            },
            {
              path: '/web/company/statisticedit',
              name: 'webcompanystatisticedit', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
              component: () => import('@/views/web/company/statistic/mod/detail.vue'),
              meta: {
                title: '流量统计',
                keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
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
        },
        {
          path: '/web/navlink',
          name: 'navlink', // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          meta: {
            title: '导航',
            keepAlive: false // 如果想要缓存此页面，那么 name 必须与页面组件名一致
          },
          component: () => import('@/views/navlink/index.vue')
        }
      ]
    }
  ]
}

export default Webadd
