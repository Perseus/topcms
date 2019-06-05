import Vue from 'vue';
import Router from 'vue-router';
import RouteConfig from './RouteConfig';

Vue.use( Router );

export default new Router( {
  mode: 'history',
  routes: RouteConfig,
  base: process.env.BASE_URL,
} );
