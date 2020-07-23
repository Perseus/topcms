import RouteNames from '../../../config/RouteNames';

import { adminGuard, siteGuard } from '../../guards';

const AdminCommerceItems = () => import( /* webpackChunkName: "admin-commerce" */ '@containers/Admin/Commerce/Items/Items.vue' );
const AdminCommerce = () => import( /* webpackChunkName: "admin-commerce" */ '@containers/Admin/Commerce/AdminCommerceIndex.vue' );
const AdminCommerceCategories = () => import( /* webpackChunkName: "admin-commerce" */ '@containers/Admin/Commerce/Categories/Categories.vue' );

const AdminPanel = () => import( /* webpackChunkName: "admin-panel" */ '@containers/Admin/Admin.vue' );
const AdminSite = () => import( /* webpackChunkName: "admin-site" */ '@containers/Admin/Site/Site.vue' );
const AdminGame = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Game.vue' );
const NewsCreate = () => import( /* webpackChunkName: "admin-site" */ '@containers/Admin/Site/NewsCreate/NewsCreate.vue' );
const NewsEdit = () => import( /* webpackChunkName: "admin-site" */ '@containers/Admin/Site/NewsEdit/NewsEdit.vue' );

const AdminGameIndex = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Index/Index.vue' );
const AdminGameAccounts = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Accounts/Accounts.vue' );
const AdminGameAccount = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Account/Account.vue' );
const AdminGameCharacters = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Characters/Characters.vue' );
const AdminGameCharacter = () => import( /* webpackChunkName: "admin-game" */ '@containers/Admin/Game/Character/Character.vue' );


export default {
  name: RouteNames.ADMIN.DASHBOARD,
  component: AdminPanel,
  path: '/admin',
  children: [
    {
      path: '/admin/site',
      alias: '/',
      name: RouteNames.ADMIN.SITE,
      component: AdminSite,
      beforeEnter: siteGuard
    },
    {
      path: '/admin/game',
      component: AdminGame,
      children: [
        {
          name: RouteNames.ADMIN.GAME.INDEX,
          path: '/',
          component: AdminGameIndex
        },
        {
          name: RouteNames.ADMIN.GAME.ACCOUNTS,
          path: '/admin/game/accounts',
          component: AdminGameAccounts,
        },
        {
          name: RouteNames.ADMIN.GAME.ACCOUNT,
          path: '/admin/game/account/:id',
          component: AdminGameAccount
        },
        {
          name: RouteNames.ADMIN.GAME.CHARACTERS,
          path: '/admin/game/characters',
          component: AdminGameCharacters,
        },
        {
          name: RouteNames.ADMIN.GAME.CHARACTER,
          path: '/admin/game/character/:id',
          component: AdminGameCharacter,
        }
      ],
      beforeEnter: adminGuard
    },
    {
      path: 'commerce',
      component: AdminCommerce,
      children: [
        {
          name: RouteNames.ADMIN.COMMERCE.CATEGORIES,
          path: 'categories',
          component: AdminCommerceCategories,
        },
        {
          name: RouteNames.ADMIN.COMMERCE.ITEMS,
          path: 'items',
          component: AdminCommerceItems
        }
      ],

      beforeEnter: adminGuard
    },
    {
      path: '/admin/news/create',
      name: RouteNames.ADMIN.NEWS.CREATE,
      component: NewsCreate,
      beforeEnter: siteGuard,
    },
    {
      path: '/admin/news/edit/:id/',
      name: RouteNames.ADMIN.NEWS.EDIT,
      component: NewsEdit,
      beforeEnter: siteGuard
    }
  ],
};
