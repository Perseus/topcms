/** 
 * Routes
 */
import VueRouter from 'vue-router';
import Index from '../containers/Index/Index.vue';
import Root from '../containers/Root/Root.vue';
import AuthRegister from '../containers/Auth/Register/Register.vue';
import AuthLogin from '../containers/Auth/Login/Login.vue';
import Dashboard from '../containers/SiteManagement/Dashboard/Dashboard.vue';
import ManageNews from '../containers/SiteManagement/ManageNews/ManageNews.vue';
import ManageDownloads from '../containers/SiteManagement/ManageDownloads/ManageDownloads.vue';
import ManageAuthors from '../containers/SiteManagement/ManageAuthors/ManageAuthors.vue';
import SiteDashboard from '../components/SiteDashboard/SiteDashboard.vue';

import store from '../store/index';
import { noAuthAllowedGuard, siteGuard, adminGuard } from './guards/auth';

const routes = [
  {
    path: '',
    component: Root,
    beforeEnter: ( to, from, next ) => {
      if ( !store.getters.userAuthStatus ) {
        store.dispatch( 'getUserAuth', to ).then( next );
      } else {
        next();
      }
    },
    children: [
      {
        name: 'root',
        path: '/',
        component: Index,
      },
      {
        name: 'auth-register',
        path: '/auth/register',
        component: AuthRegister,
        beforeEnter: noAuthAllowedGuard,
      },
      {
        name: 'auth-login',
        path: '/auth/login',
        component: AuthLogin,
        beforeEnter: noAuthAllowedGuard,
      },
      {
        path: '/site',
        component: Dashboard,
        children: [
          {
            name: 'site-dashboard',
            component: SiteDashboard,
            path: '/',
          },
          {
            name: 'manage-news',
            path: '/site/news/:id',
            component: ManageNews
          },
          {
            name: 'edit-authors',
            path: '/site/author/edit/:id',
            component: ManageAuthors,
          },
          {
            name: 'create-author',
            path: '/site/author/create/',
            component: ManageAuthors,
          },
          {
            name: 'manage-downloads',
            path: '/site/downloads/:id?',
            component: ManageDownloads,
          },
        ],
        beforeEnter: siteGuard
      }
    ],

  },
]
const Router = new VueRouter( {
  routes,
  mode: 'history',
} );

export default Router;
