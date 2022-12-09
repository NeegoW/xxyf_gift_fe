import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      KeepAlive: true,
      requiresAuth: true
    }
  },
  {
    path: '/bind',
    name: 'bind',
    component: () => import('../views/BindView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exLog',
    name: 'exLog',
    component: () => import('../views/ExLogView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exInfo',
    name: 'exInfo',
    component: () => import('../views/ExInfoView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goodInfo/:id',
    name: 'goodInfo',
    component: () => import('../views/GoodInfoView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orderInfo/:id',
    name: 'orderInfo',
    component: () => import('../views/OrderInfoView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addr',
    name: 'addr',
    component: () => import('../views/AddrView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/wxAuth',
    name: 'wxAuth',
    component: () => import('../components/WxAuth.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const isAuth = sessionStorage.getItem('isAuth') === 'true'
  if (!isAuth && to.meta.requiresAuth) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到授权页面,保存我们所在的位置，以便以后再来
    return {
      name: 'wxAuth',
      // 保存我们所在的位置，以便以后再来
      query: { from: to.fullPath }
    }
  }
})

export default router
