import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router';
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import LayoutBlank from './Layouts/LayoutBlank.vue';
import LayoutElementVue from './Layouts/LayoutElement.vue';


import HomeView from './views/HomeView.vue'

import LoginView from './views/Auth/LoginView.vue'


// import './styles/dark/css-vars.css'
const app = createApp(App)

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: LayoutElementVue,
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
  
app.use(router)
app.use(ElementPlus)
app.mount('#app')
