import { createRouter, createWebHistory } from 'vue-router'

import LayoutBlank from '../Layouts/LayoutBlank.vue';
import LayoutElementVue from '../Layouts/LayoutElement.vue';
import LayoutDN_DK from '../Layouts/LayoutDN_DK.vue'
import LayoutMenuDoc from '../Layouts/LayoutMenuDoc.vue'

import Cookies from 'js-cookie';
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'

import UserView from '../views/User/Index.vue'
import BudgetCateView from '../views/BudgetCat/Index.vue'

import BudgetView from '../views/Budget/Index.vue'
import MoneyHolderView from '../views/MoneyHolder/Index.vue'
import IncomeView from '../views/Income/Index.vue'
import DebtView from '../views/Debt/Index.vue'
import LoanView from '../views/Loan/Index.vue'
import LoanDeatailView from '../views/Loan/Deatail.vue'
import MoneySpendView from '../views/MoneySpend/Index.vue'
import MoneyOverView from '../views/Overview/Index.vue'
import Setting from '../views/Setting/Index.vue'
import ErrorPage from '../views/Error/Index.vue'

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LayoutMenuDoc,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: MoneyHolderView,
        },
        {
          path: 'budgetcate',
          component: BudgetCateView,
        },
        {
          path: 'budget',
          component: BudgetView,
        },
        {
          path: 'MoneyHolder',
          component: MoneyHolderView,
        },
        {
          path: 'Income',
          component: IncomeView,
        },
        {
          path: 'user',
          component: UserView,
        },
        {
          path: 'Loan',
          component: LoanView,
        },
        {
          path: 'Debt',
          component: DebtView,
        },
        {
          path: 'MoneySpend',
          component: MoneySpendView,
        },
        {
          path: 'Loan/:Id',
          component: LoanDeatailView,
        },
        {
          path: 'Overview',
          component: MoneyOverView,
        },
        {
          path: 'Setting',
          component: Setting,
        }
        // Other routes using default layout...
      ],
    },
    {
      path: '/auth',
      component: LayoutDN_DK,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView,
        },
        // Other routes using alternative layout...
      ],
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('accessToken');
  // console.log(isAuthenticated);
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to the login page
  } else {
    next(); // Continue to the requested route
  }
});
export default router