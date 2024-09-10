import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: ()=> import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!cookies.get('LegitUser')
      if (!isAuthenticated) {
        next({ name: 'HomeView' });
      } else {
        next();
      }
    }
    }, 
  {
    path: '/report',
    name: 'report',
    component: ()=> import('@/views/ReportView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UsersView.vue')
  },
  {
    path:'/products',
    name:'products',
    component: () => import('@/views/ProductsView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
