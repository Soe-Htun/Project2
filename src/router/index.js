import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () =>  import("../views/Auth/Login.vue"),
      meta: { requiresVisitor: true }
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import("../views/Layout/Layout.vue"),
        redirect: '/home',
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/home',
            name: 'home',
            component: () => import("../pages/Home.vue"),
            
          }
        ]
    }
  ]
})

export default router
