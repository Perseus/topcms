import RouteNames from '../../config/RouteNames';

import { noAuthAllowedGuard, siteGuard } from '../guards/auth';

import Root from '../../containers/Root/Root.vue';
import Index from '../../containers/Index/Index.vue';
import AuthRegister from '../../containers/Auth/Register/Register.vue';
import AuthLogin from '../../containers/Auth/Login/Login.vue';
import ContentManagement from '../../containers/ContentManagement/ContentManagement.vue';
import SiteDashboard from '../../containers/ContentManagement/SiteDashboard/SiteDashboard.vue';
import ManageDownloads from '../../containers/ContentManagement/ManageDownloads/ManageDownloads.vue';
import ManageAuthors from '../../containers/ContentManagement/ManageAuthors/ManageAuthors.vue';

const RouteConfig = [
  {
    path: '',
    component: Root,
    children: [
      {
        name: RouteNames.ROOT.__BASE__,
        path: '/',
        component: Index
      },
      {
        name: RouteNames.AUTH.REGISTER,
        path: '/auth/register',
        component: AuthRegister,
        beforeEnter: noAuthAllowedGuard,
      },
      {
        name: RouteNames.AUTH.LOGIN,
        path: '/auth/login',
        component: AuthLogin,
        beforeEnter: noAuthAllowedGuard,
      },
      {
        name: RouteNames.CONTENT_MANAGEMENT.DASHBOARD,
        path: '/site',
        component: ContentManagement,
        children: [
          {
            name: RouteNames.CONTENT_MANAGEMENT.MANAGE_AUTHORS,
            path: '/site/authors/:id?',
            component: ManageAuthors
          }
        ],
      }
    ],
  }
];

export default RouteConfig;
