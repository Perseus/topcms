import RouteNames from '../../config/RouteNames';
import { RootResolver } from '../resolvers';
import { userGuard } from '../guards';
import adminRoutes from './routes/admin';

const Mall = () => import( /* webpackChunkName: 'mall' */ '@containers/Mall/Mall.vue' );
const StorageBox = () => import( /* webpackChunkName: 'user' */ '@containers/StorageBox/StorageBox.vue' );
const App = () => import( /* webpackChunkName: 'app-main' */ '@containers/App/App.vue' );
const Landing = () => import( /* webpackChunkName: 'app-main' */ '@containers/Landing/Landing.vue' );
const Register = () => import( /* webpackChunkName: 'user' */ '@containers/Register/Register.vue' );
const Login = () => import( /* webpackChunkName: 'user' */ '@containers/Login/Login.vue' );
const NewsItemContainer = () => import( /* webpackChunkName: 'site-data' */ '@containers/NewsItemContainer/NewsItemContainer.vue' );
const NewsContainer = () => import( /* webpackChunkName: 'site-data' */ '@containers/NewsContainer/NewsContainer.vue' );
const NewsList = () => import( /* webpackChunkName: 'site-data' */ '@containers/NewsList/NewsList.vue' );
const DownloadList = () => import( /* webpackChunkName: 'site-data' */ '@containers/DownloadList/DownloadList.vue' );
const Ranking = () => import( /* webpackChunkName: 'site-data' */ '@containers/Ranking/Ranking.vue' );
const UserAccountManagement = () => import( /* webpackChunkName: 'user' */ '@containers/UserAccountManagement/UserAccountManagement.vue' );
const AccountDetails = () => import( /* webpackChunkName: 'user' */ '@containers/AccountDetails/AccountDetails.vue' );

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
        component: UserAccountManagement,
        path: '/account',
        children: [
          {
            path: '/',
            alias: '/details',
            name: RouteNames.USER.DETAILS,
            component: AccountDetails,
          },
          {
            path: 'storage-box',
            name: RouteNames.USER.STORAGE_BOX,
            component: StorageBox,
          }
        ],
        beforeEnter: userGuard,
      },
      adminRoutes,
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
      },
      {
        path: '/commerce',
        component: Mall,
        children: [
          {
            name: RouteNames.COMMERCE.ITEM_MALL,
            path: 'item-mall',
          },
          {
            path: 'award-center',
            name: RouteNames.COMMERCE.AWARD_CENTER,
          }
        ]
      },
      {
        path: '*',
        component: Landing
      }
    ]
  }
];

export default RouteConfig;
