import Vue from 'vue';
import Router from 'vue-router';
import RouteConfig from './config/RouteConfig';
import { routeResolveHandler } from './resolvers';

Vue.use( Router );

const router = new Router( {
  mode: 'history',
  routes: RouteConfig,
  base: process.env.BASE_URL,
} );


router.beforeEach( routeResolveHandler );

export default router;
