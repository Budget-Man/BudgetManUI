import { createRouter, createWebHistory } from 'vue-router'

import LayoutBlank from '../Layouts/LayoutBlank.vue';
import LayoutElementVue from '../Layouts/LayoutElement.vue';


import Cookies from 'js-cookie';
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/Auth/LoginView.vue'

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LayoutElementVue,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: HomeView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: '/auth',
      component: LayoutBlank,
      children: [
        {
          path: '',
          component: LoginView,
        },
        // Other routes using alternative layout...
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('accessToken');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to the login page
  } else {
    next(); // Continue to the requested route
  }
});
export default router
