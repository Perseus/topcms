import App from '../containers/App/App.vue';
import Landing from '../containers/Landing/Landing.vue';
import Register from '../containers/Register/Register.vue';
import Login from '../containers/Login/Login.vue';
import RouteNames from '../config/RouteNames';

const RouteConfig = [
  {
    path: '',
    component: App,
    children: [
      {
        name: RouteNames.ROOT.__LANDING__,
        component: Landing,
        path: '/',
      },
      {
        name: RouteNames.AUTH.REGISTER,
        component: Register,
        path: '/register'
      },
      {
        name: RouteNames.AUTH.LOGIN,
        component: Login,
        path: '/login',
      }
    ]
  }
];

export default RouteConfig;
