import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { blogRoutes } from '@/generatedRoutes'
import BlogHomeView from '@/views/BlogHomeView.vue'
import BlogHome from '@/components/blog/BlogHome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog',
    component: BlogHomeView,
    children: [
        {
            path: '',
            name: 'bloghome',
            component: BlogHome,
            meta: { showRightHome: true, showContentNav: false },
        },
        ...blogRoutes
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
