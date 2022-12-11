import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      keepAlive: true,
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

router.beforeEach((to, from, next) => {
  const isAuth = sessionStorage.getItem('isAuth') === 'true'
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const cardInfo = userInfo?.card_info
  if (!isAuth && to.meta.requiresAuth) {
    next({ name: 'wxAuth' })
  } else {
    if (isAuth && to.name === 'wxAuth') {
      // 已经登录了，就不要再去授权页面了
      if (cardInfo) {
        next({ name: 'home' })
      } else {
        next({ name: 'bind' })
      }
    } else {
      next()
    }
  }
})

export default router
