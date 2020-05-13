import Vue from 'vue';
import Router from 'vue-router';
import RouteConfig from './config/RouteConfig';
import { routeResolveHandler } from './resolvers';
import { afterEachResolver } from '../utils/RouterUtils';

Vue.use( Router );

const router = new Router( {
  mode: 'history',
  routes: RouteConfig,
  base: process.env.BASE_URL,
} );


router.beforeResolve( routeResolveHandler );
router.afterEach( afterEachResolver );

export default router;
