import { createRouter, createWebHistory } from 'vue-router'
import Overlay from '../overlay/index'
import Login from '@/views/Login/index'

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
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {title: '登录'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('blog_token') || to.path === '/login') {
    document.title = to.meta.title + ' -- 爱吃鱼的猫的博客'
    next()
  } else {
    next({
      path: '/login',
      replace: true,
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
})

export default router
