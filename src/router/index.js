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
    path: '/exManual',
    name: 'exManual',
    component: () => import('../views/ExManualView.vue'),
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
    path: '/addr/:packageId/:idx',
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
  if (!isAuth && to.name !== 'wxAuth') {
    next({
      name: 'wxAuth',
      query: { from: to.fullPath }
    })
  } else {
    if (to.name === 'wxAuth') {
      next()
    } else {
      if (!cardInfo?.id && to.name !== 'bind') {
        next('/bind')
      } else {
        next()
      }
    }
  }
})

export default router
