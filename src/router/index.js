import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue') },
  { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
  { path: '/admin', name: 'admin-login', component: () => import('../views/AdminLogin.vue') },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Block the dashboard unless a Supabase session exists.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const { data } = await supabase.auth.getSession()
  if (!data.session) return { name: 'admin-login' }
  return true
})

export default router
