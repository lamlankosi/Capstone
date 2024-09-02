import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCookies } from 'vue3-cookies'
import ReportView from '@/views/ReportView.vue'
import AboutView from '@/views/AboutView.vue'

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
    component: AboutView,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!cookies.get('LegitUser')
      if (!isAuthenticated) {
        next({ name: 'HomeView' })
      } else {
        next()
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
