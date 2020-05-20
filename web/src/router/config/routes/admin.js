import AdminCommerceItems from '@containers/Admin/Commerce/Items/Items.vue';

import AdminPanel from '../../../containers/Admin/Admin.vue';
import AdminSite from '../../../containers/Admin/Site/Site.vue';
import AdminGame from '../../../containers/Admin/Game/Game.vue';
import NewsCreate from '../../../containers/Admin/Site/NewsCreate/NewsCreate.vue';
import NewsEdit from '../../../containers/Admin/Site/NewsEdit/NewsEdit.vue';

import AdminGameIndex from '../../../containers/Admin/Game/Index/Index.vue';
import AdminGameAccounts from '../../../containers/Admin/Game/Accounts/Accounts.vue';
import AdminGameAccount from '../../../containers/Admin/Game/Account/Account.vue';
import AdminGameCharacters from '../../../containers/Admin/Game/Characters/Characters.vue';
import AdminGameCharacter from '../../../containers/Admin/Game/Character/Character.vue';
import AdminCommerce from '../../../containers/Admin/Commerce/AdminCommerceIndex.vue';
import AdminCommerceCategories from '../../../containers/Admin/Commerce/Categories/Categories.vue';

import RouteNames from '../../../config/RouteNames';

import { adminGuard, siteGuard } from '../../guards';

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
