import App from '../../containers/App/App.vue';
import Landing from '../../containers/Landing/Landing.vue';
import Register from '../../containers/Register/Register.vue';
import Login from '../../containers/Login/Login.vue';
import AdminPanel from '../../containers/Admin/Admin.vue';
import AdminSite from '../../containers/Admin/Site/Site.vue';
import AdminGame from '../../containers/Admin/Game/Game.vue';
import RouteNames from '../../config/RouteNames';
import NewsCreate from '../../containers/Admin/Site/NewsCreate/NewsCreate.vue';
import NewsEdit from '../../containers/Admin/Site/NewsEdit/NewsEdit.vue';

import { RootResolver } from '../resolvers';
import { adminGuard } from '../guards';

const RouteConfig = [
  {
    path: '',
    component: App,
    beforeEnter: RootResolver,
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
      },
      {
        name: RouteNames.ADMIN.DASHBOARD,
        component: AdminPanel,
        path: '/admin',
        children: [
          {
            path: '/admin/site',
            name: RouteNames.ADMIN.SITE,
            component: AdminSite,
          },
          {
            path: '/admin/game',
            name: RouteNames.ADMIN.GAME,
            component: AdminGame
          },
          {
            path: '/admin/news/create',
            name: RouteNames.ADMIN.NEWS.CREATE,
            component: NewsCreate,
          },
          {
            path: '/admin/news/edit/:id/',
            name: RouteNames.ADMIN.NEWS.EDIT,
            component: NewsEdit
          }
        ],
        beforeEnter: adminGuard
      }
    ]
  }
];

export default RouteConfig;
