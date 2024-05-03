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
import { LoginResult } from '@/Models/LoginResult'

import  MoneyHolderDetailView  from '../views/MoneyHolder/Details.vue'
// import pkiValidation from '../views/PkiValidation.vue'
// import pkiValidation from  '@/pkiValidation/5DF14AC847D6C0417597A187ED0EAC38.txt'
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
          component: MoneyOverView,
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
          path: 'MoneyHolder/:Id',
          component: MoneyHolderDetailView,
        },
        {
          path: 'Income',
          component: IncomeView,
        },
        {
          path: 'user',
          component: UserView,
          meta: { requiresAuth: true, roles: ["Admin", "SuperAdmin"] },
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
        },
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
    // {
    //   path: '/well-known',
    //   // name: 'pkiValidation',
    //   component: () => import('@/pkiValidation/5DF14AC847D6C0417597A187ED0EAC38.txt'),
    // }
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated: boolean = !!Cookies.get('accessToken');
  const userRoles: string[] = getRolesFromToken() ??[];

  if (to.meta.requiresAuth && isAuthenticated == false) {
    next('/login'); // Chuyển hướng đến trang đăng nhập
  } else if (to.meta.roles && !hasPermission(userRoles, to.meta.roles as string[])) {
    // Xử lý truy cập không được phép
    next('/'); // Chuyển hướng đến trang 403 hoặc xử lý khác
  } else {
    next(); // Tiếp tục đến trang yêu cầu
  }
});

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
function getRolesFromToken(): string[] | null {
  try {
    // var token = Cookies.get('accessToken')?.toString() ?? "";
    const decodedToken = new LoginResult();
    var jsonString = Cookies.get('Roles')?.toString() ?? '';
    var jsonObject = JSON.parse(jsonString);
    var arrayFromString = Object.values(jsonObject);
    decodedToken.roles = arrayFromString as string[];
    console.log(decodedToken);
    return decodedToken.roles || [];
  } catch (error) {
    // console.error(error);
    return null;
  }
}
interface TokenPayload {
  [x: string]: never[];
}
export default router