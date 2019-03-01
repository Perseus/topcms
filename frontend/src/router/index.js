/** 
 * Routes
 */
import VueRouter from 'vue-router';
import Index from '../containers/Index/Index.vue';
import Root from '../containers/Root/Root.vue';
import AuthRegister from '../containers/Auth/Register/Register.vue';
import AuthLogin from '../containers/Auth/Login/Login.vue';

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
      },
      {
        path: '/auth/login',
        component: AuthLogin,
      },
    ]
  },
]
const Router = new VueRouter({
  routes
});

export default Router;