import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordNormalized } from 'vue-router'
import { getToken } from '@/utils/auth'
import { DEFAULT_LAYOUT } from './base'

// 路由模块化自动导入
const modules = import.meta.globEager('./modules/*.ts')

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

const routes = [
  {
    path: '',
    redirect: '/overview'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/guide/agreement.vue'),
    meta: {
      title: '协议',
      keepAlive: false
    }
  },
  {
    path: '/guide1',
    name: 'Guide1',
    component: () => import('@/views/guide/step1.vue'),
    meta: {
      title: '引导页1',
      keepAlive: false
    }
  },
  {
    path: '/guide2',
    name: 'guide2',
    component: () => import('@/views/guide/step2.vue'),
    meta: {
      title: '引导页2',
      keepAlive: false
    }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: DEFAULT_LAYOUT,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
          keepAlive: false
        }
      },
      {
        path: 'navigation',
        name: 'Navigation',
        component: () => import('@/views/navigation/index.vue'),
        meta: {
          title: '导航',
          keepAlive: false
        }
      },
      {
        path: 'tool',
        name: 'Tool',
        component: () => import('@/views/tool/index.vue'),
        meta: {
          title: '功能页',
          keepAlive: true
        }
      }
    ]
  },
  ...appRoutes
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROURE_BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    next()
    // const token = getToken()
    // if (!token) {
    //   next('/login')
    // } else {
    //   next()
    // }
  }
})

export default router
