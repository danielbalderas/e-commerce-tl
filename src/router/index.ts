import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainTab from '../views/MainTab.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/productsTab'
  },
  {
    path: '/tabs/',
    component: MainTab,
    children: [
      {
        path: '',
        redirect: '/tabs/productsTab'
      },
      {
        path: 'productsTab',
        component: () => import('@/views/ProductsTab.vue')
      },
      {
        path: 'carTab',
        component: () => import('@/views/CarTab.vue')
      },
      {
        path: 'notificationsTab',
        component: () => import('@/views/NotificationsTab.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
