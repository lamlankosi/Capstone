import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useCookies } from 'vue3-cookies'
import ReportView from '@/views/ReportView.vue'

const { cookies } = useCookies()

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
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
    component: ReportView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
