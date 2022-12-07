import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getWxCode } from '@/utils/wechat'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      KeepAlive: true,
      Auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/exLog',
    name: 'exLog',
    component: () => import('../views/ExLogView.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/exInfo',
    name: 'exInfo',
    component: () => import('../views/ExInfoView.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/goodInfo/:id',
    name: 'goodInfo',
    component: () => import('../views/GoodInfoView.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/orderInfo/:id',
    name: 'orderInfo',
    component: () => import('../views/OrderInfoView.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/addr/',
    name: 'addr',
    component: () => import('../views/AddrView.vue'),
    meta: {
      Auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  // TODO: 未登录时，跳转到登录页
  if (to.meta.Auth && !localStorage.getItem('token')) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login'
    }
  }
})

export default router
