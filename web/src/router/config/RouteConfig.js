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
import NewsItemContainer from '../../containers/NewsItemContainer/NewsItemContainer.vue';
import NewsContainer from '../../containers/NewsContainer/NewsContainer.vue';
import NewsList from '../../containers/NewsList/NewsList.vue';
import DownloadList from '../../containers/DownloadList/DownloadList.vue';
import Ranking from '../../containers/Ranking/Ranking.vue';
import UserAccountManagement from '../../containers/UserAccountManagement/UserAccountManagement.vue';
import AccountDetails from '../../containers/AccountDetails/AccountDetails.vue';

import { RootResolver } from '../resolvers';
import { adminGuard, userGuard } from '../guards';

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
            alias: '/',
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
      },
      {
        component: UserAccountManagement,
        path: '/account',
        children: [
          {
            path: '/',
            alias: '/details',
            name: RouteNames.USER.DETAILS,
            component: AccountDetails,
          }
        ],
        beforeEnter: userGuard,
      },
      {
        path: '/news',
        component: NewsContainer,
        children: [
          {
            name: RouteNames.ROOT.NEWS.LIST,
            path: '/',
            component: NewsList,
          },
          {
            name: RouteNames.ROOT.NEWS.ARTICLE,
            path: '/news/:id',
            component: NewsItemContainer,
          },
        ],
      },
      {
        path: '/downloads',
        name: RouteNames.ROOT.DOWNLOAD.LIST,
        component: DownloadList
      },
      {
        path: '/ranking',
        name: RouteNames.ROOT.RANKING.__LANDING__,
        component: Ranking,
      }
    ]
  }
];

export default RouteConfig;
