import { defineStore } from 'pinia'

interface MenuState {
  menuTree: MenuItem[]
}
const baseURL = import.meta.env.VITE_API_BASE_URL
export const useMenuStore = defineStore({
  id: 'Menu',
  state: (): MenuState => {
    return {
      menuTree: [
        {
          icon: 'icon-home',
          id: 'GK',
          name: '概况',
          path: '/overview',
          keepAlive: false,
          hidden: false,
          level: 1
        },
        {
          icon: 'icon-email',
          id: 'SJ',
          name: '商机',
          path: '/web/inquiry',
          keepAlive: false,
          hidden: false,
          level: 1
        },
        {
          icon: 'icon-ordered-list',
          id: 'SEOFW',
          name: 'SEO服务',
          path: '/seo',
          keepAlive: false,
          hidden: false,
          level: 1,
          children: [
            {
              id: 'AIFBFW',
              name: 'AI发布服务',
              path: '/seo/ai',
              keepAlive: false,
              hidden: false,
              level: 2
            },
            {
              id: 'GOOGLESSPM',
              name: 'Google搜索排名',
              path: '/seo/google',
              keepAlive: false,
              hidden: false,
              level: 2
            },
            {
              id: 'YOUTUBEPM',
              name: 'YouTube排名',
              path: '/seo/youtube',
              keepAlive: false,
              hidden: false,
              level: 2
            },
            {
              id: 'TIKTOKPM',
              name: 'TikTok排名',
              path: '/seo/tiktok',
              keepAlive: false,
              hidden: false,
              level: 2
            },
            {
              id: 'SYFLSEO',
              name: '首页分类SEO',
              path: '/seo/cate',
              keepAlive: false,
              hidden: false,
              level: 2
            },
          ]
        },
        {
          icon: 'icon-file',
          id: 'CP',
          name: '产品',
          path: '/web',
          keepAlive: false,
          hidden: false,
          level: 1,
          children: [
            {
              id: 'CPGL',
              name: '产品管理',
              path: '/web/webproduct/list',
              keepAlive: false,
              hidden: false,
              level: 2
            },
            {
              id: 'FLGL',
              name: '分类管理',
              path: '/web/webcate/list',
              keepAlive: true,
              hidden: false,
              level: 2
            },
            {
              id: 'PLSZ',
              name: '批量设置',
              path: '/web/webproduct/proset',
              keepAlive: true,
              hidden: false,
              level: 2
            }
          ]
        },
        {
          icon: 'icon-book',
          id: 'XWAL',
          name: '新闻案例',
          path: '/file',
          keepAlive: false,
          hidden: false,
          level: 1,
          children: [
            {
              id: 'XWZX',
              name: '新闻',
              path: '/file/news',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ALZX',
              name: '案例',
              path: '/file/case',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            }
          ]
        },
        {
          icon: 'icon-bg-colors',
          id: 'WZZX',
          name: '网站装修',
          keepAlive: false,
          hidden: false,
          level: 1,
          path: '',
          children: [
            {
              id: 'MB',
              name: '模板',
              path: 'mod',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2,
              link: window.location.origin + '/demo/index.html'
            },
            {
              id: 'DH',
              name: '导航',
              path: '/web/navlink',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'XWZX',
              name: '幻灯',
              path: '/banner/list',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ALZX',
              name: '产品优先展示',
              path: '/web/webproduct/orderlist',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            }
          ]
        },
        {
          icon: 'IconDesktop',
          id: 'WZSS',
          name: '网站设置',
          keepAlive: false,
          hidden: false,
          level: 1,
          path: '',
          children: [
            {
              id: 'JCXX',
              name: '基础信息',
              path: '/web/company/intro',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'LXXX',
              name: '联系信息',
              path: '/web/company/contact',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'GCXX',
              name: '工厂信息',
              path: '/web/company/factory',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ZLRZ',
              name: '质量认证',
              path: '/web/company/quality',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'KHZZ',
              name: '客户赠言',
              path: '/web/company/message',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'YSXY',
              name: '隐私协议',
              path: '/web/company/policy',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'WZXTB',
              name: '网站小图标',
              path: '/web/company/icon',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'FWSZ',
              name: '访问设置',
              path: '/web/company/language',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ZDYDM',
              name: '自定义代码',
              path: '/web/company/statistic',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            }
          ]
        },
        // {
        //   icon: 'icon-fire',
        //   id: 'YXTG',
        //   name: '营销推广',
        //   keepAlive: false,
        //   hidden: false,
        //   level: 1
        // },

        {
          icon: 'icon-save',
          id: 'SCGL',
          name: '素材管理',
          keepAlive: false,
          hidden: false,
          level: 1,
          path: '/resource/list'
        },
        {
          icon: 'icon-public',
          id: 'WLFW',
          name: '物流服务',
          keepAlive: false,
          hidden: false,
          level: 1,
          path: 'inquiryadd',
          link: ' https://scm.ecer.com/index.php?r=inquiry/add'
        },
        {
          icon: 'icon-settings',
          id: 'WZSZ',
          name: '后台设置',
          keepAlive: false,
          hidden: false,
          level: 1,
          children: [
            {
              id: 'ZHGL',
              name: '账户管理',
              path: '/account/detail',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ZHJF',
              name: '账户积分',
              path: '/integral/detail',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            }
          ]
        },
        {
          icon: 'icon-apps',
          id: 'YYSC',
          name: '应用市场',
          path: '/apps/list',
          keepAlive: false,
          hidden: false,
          level: 1
        },
      ]
    }
  },
  getters: {},
  actions: {}
})
