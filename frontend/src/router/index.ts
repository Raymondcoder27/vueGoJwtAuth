import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Declare the RouteMeta with requiresAuth property
declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
    parentName?: string;
  }
}

// Define your routes
const appRoutes: RouteRecordRaw[] = [
  {
    path: "/", 
    name: "home",
    meta: { requiresAuth: false },
    component: () => import("@/layouts/HomeLayout.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard", 
        name: "dashboard",
        meta: { requiresAuth: true },  // Requires authentication
        component: () => import("@/domain/dashboard/Dashboard.vue"),
      },
      {
        path: "users", 
        name: "users",
        meta: { requiresAuth: true },  // Requires authentication
        component: () => import("@/domain/users/Users.vue"),
      },
      {
        path: "settings", 
        name: "settings",
        meta: { requiresAuth: true },  // Requires authentication
        component: () => import("@/domain/settings/Settings.vue"),
      }
    ]
  },
  {
    path: "/register", 
    name: "register",
    meta: { requiresAuth: false },  // Public route
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/login", 
    name: "login",
    meta: { requiresAuth: false },  // Public route
    component: () => import("@/views/LoginView.vue"),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   meta: { requiresAuth: true },  // Requires authentication
  //   component: () => import('@/views/AboutView.vue'),
  // },
  // {
  //   path: '/:pathMatch(.*)*',  // Catch-all route for 404
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue'),
  // }
]

// Create the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: appRoutes, 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: "smooth" }
    }
  }
})

// Navigation Guard to handle protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');  // Check if the user is authenticated by token presence

  // If the route requires authentication and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });  // Redirect to login
  } else {
    next();  // Proceed to the route
  }
});

export default router;
