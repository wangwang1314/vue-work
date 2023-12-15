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
          icon: 'icon-apps',
          id: 'GK',
          name: '概况',
          path: '/overview',
          keepAlive: false,
          hidden: false,
          level: 1
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
                // {
                //   id: 'YXZS',
                //   name: '优先展示',
                //   path: '/web/webproduct/orderlist',
                //   keepAlive: true,
                //   hidden: false,
                //   level: 3
                // },
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
                },
                // {
                //   id: 'HGBM',
                //   name: '海关编码',
                //   path: '/web/webproduct/hscode',
                //   keepAlive: true,
                //   hidden: false,
                //   level: 3
                // }
  
            // {
            //   id: 'GSZL',
            //   name: '公司资料',
            //   path: '/web/company',
            //   keepAlive: false,
            //   hidden: false,
            //   icon: 'menu-detail',
            //   level: 2,
            //   children: [
            //     {
            //       id: 'GSJS',
            //       name: '公司介绍',
            //       path: '/web/company/intro',
            //       keepAlive: false,
            //       hidden: false,
            //       level: 3
            //     },
            //     {
            //       id: 'GSYS',
            //       name: '公司优势',
            //       path: '/web/company/adv',
            //       keepAlive: false,
            //       hidden: false,
            //       level: 3
            //     },
            //     {
            //       id: 'HZPP',
            //       name: '合作品牌',
            //       path: '/web/company/brand',
            //       keepAlive: false,
            //       hidden: false,
            //       level: 3
            //     },
            //     {
            //       id: 'KHZY',
            //       name: '客户赠言',
            //       path: '/web/company/message',
            //       keepAlive: false,
            //       hidden: false,
            //       level: 3
            //     },
            //     {
            //       id: 'GCZS',
            //       name: '工厂展示',
            //       path: '/web/company/factory',
            //       keepAlive: false,
            //       hidden: false,
            //       level: 3
            //     },
            //   ]
            // },
            // {
            //   id: 'FLGL',
            //   name: '分类管理',
            //   path: '',
            //   keepAlive: false,
            //   hidden: false,
            //   icon: 'menu-detail',
            //   level: 2,
            //   children: [
            //     {
            //       id: 'FLLB',
            //       name: '分类列表',
            //       path: '/web/webcate/list',
            //       keepAlive: true,
            //       hidden: false,
            //       level: 3
            //     }
            //   ]
            // }
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
              name: '新闻中心',
              path: '/file/news',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            {
              id: 'ALZX',
              name: '案例中心',
              path: '/file/case',
              keepAlive: false,
              hidden: false,
              icon: 'menu-detail',
              level: 2
            },
            // {
            //   id: 'FAQS',
            //   name: 'Faqs',
            //   path: '/file/faqs',
            //   keepAlive: false,
            //   hidden: false,
            //   icon: 'menu-detail',
            //   level: 2
            // },
            // {
            //   id: 'ZDYYM',
            //   name: '自定义页面',
            //   path: '/file/custom',
            //   keepAlive: false,
            //   hidden: false,
            //   icon: 'menu-detail',
            //   level: 2
            // }
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
              name: '模版',
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
              id: 'GCXX',
              name: '工厂信息',
              path: '/web/company/factory',
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
          icon: 'icon-settings',
          id: 'WZSZ',
          name: '后台设置',
          keepAlive: false,
          hidden: false,
          level: 1
        },
        // {
        //   icon: 'menu-form',
        //   id: 'BDGL',
        //   name: '表单管理',
        //   path: '/form',
        //   keepAlive: true,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'JCBD',
        //       name: '基础表单',
        //       path: '/form/base',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'FBBD',
        //       name: '分步表单',
        //       path: '/form/step',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-table',
        //   id: 'BGGL',
        //   name: '表格管理',
        //   path: '/table',
        //   keepAlive: true,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'ZHBG',
        //       name: '综合表格',
        //       path: '/table/main',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'ZDYBG',
        //       name: '自定义表格',
        //       path: '/table/custom',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-system',
        //   id: 'XTGL',
        //   name: '系统管理',
        //   keepAlive: false,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'BMGL',
        //       name: '部门管理',
        //       path: '/system/dept-manage',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'YHGL',
        //       name: '用户管理',
        //       path: '/system/user-manage',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'JSGL',
        //       name: '角色管理',
        //       path: '/system/role-manage',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'CDGL',
        //       name: '菜单管理',
        //       path: '/system/menu-manage',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'GRZX',
        //       name: '个人中心',
        //       path: '/system/user-center',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'NQST',
        //       name: '内嵌页面',
        //       path: '/system',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-detail',
        //   id: 'XQYM',
        //   name: '详情页',
        //   path: '/detail',
        //   keepAlive: true,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'JCXQY',
        //       name: '基础详情页',
        //       path: '/detail/base',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'GJXQY',
        //       name: '高级详情页',
        //       path: '/detail/senior',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-error',
        //   id: 'ERROR',
        //   name: '异常页',
        //   keepAlive: false,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'error403',
        //       name: '403',
        //       path: '/error/403',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'error404',
        //       name: '404',
        //       path: '/error/404',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'error500',
        //       name: '500',
        //       path: '/error/500',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-result',
        //   id: 'RESULT',
        //   name: '结果页',
        //   keepAlive: false,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'page-success',
        //       name: '成功页',
        //       path: '/result/success',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'page-fail',
        //       name: '失败页',
        //       path: '/result/fail',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-document',
        //   id: 'WD',
        //   name: '文档',
        //   keepAlive: false,
        //   hidden: false,
        //   children: [
        //     {
        //       id: 'vue3',
        //       name: 'vue3文档',
        //       path: '/document/vue3',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'arco-design',
        //       name: 'arco ui文档',
        //       path: '/document/arco-design',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'juejin',
        //       name: '掘金',
        //       path: '/document/juejin',
        //       keepAlive: false,
        //       hidden: false
        //     },
        //     {
        //       id: 'itab',
        //       name: 'iTab',
        //       path: '/document/itab',
        //       keepAlive: false,
        //       hidden: false
        //     }
        //   ]
        // },
        // {
        //   icon: 'menu-test',
        //   id: 'Tool',
        //   name: '功能页',
        //   path: '/tool',
        //   keepAlive: false,
        //   hidden: false
        // },
        // {
        //   icon: 'menu-nav',
        //   id: 'DHY',
        //   name: '导航',
        //   path: '/navigation',
        //   keepAlive: false,
        //   hidden: false
        // },
        // {
        //   icon: 'menu-about',
        //   id: 'ABOUT',
        //   name: '关于',
        //   path: '/about',
        //   keepAlive: false,
        //   hidden: false
        // }
      ]
    }
  },
  getters: {},
  actions: {}
})
