import { createRouter, createWebHistory } from 'vue-router'
import Overlay from '../overlay/index'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Overlay,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard/index'),
        meta: {title: '博客详情'}
      }
    ]
  },
  {
    path: '/article',
    component: Overlay,
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/Article/index'),
        meta: {title: '文章管理'}
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
