/** 
 * Routes
 */
import VueRouter from 'vue-router';
import Index from '../containers/Index/Index.vue';
import Root from '../containers/Root/Root.vue';
import AuthRegister from '../containers/Auth/Register/Register.vue';
import AuthLogin from '../containers/Auth/Login/Login.vue';
import store from '../store/index';

import { noAuthAllowedGuard, authGuard } from './guards/auth';

const routes = [
  { 
    path: '',
    component: Root,
    children: [
      {
        path: '/', 
        component: Index,
      }, 
      {
        path: '/auth/register',
        component: AuthRegister,
        beforeEnter: noAuthAllowedGuard,
      },
      {
        path: '/auth/login',
        component: AuthLogin,
        beforeEnter: noAuthAllowedGuard,
      },
    ],
    
  },
]
const Router = new VueRouter({
  routes,
});

Router.beforeEach((to, from, next) => {

  if (!store.state.userState.isLoggedIn) {
    store.dispatch('getUserAuth').then(next);
  } else {
    next();
  }
  
})


export default Router;