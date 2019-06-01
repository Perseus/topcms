/** 
 * Routes
 */
import VueRouter from 'vue-router';
import routes from './config/RouteConfig';
import { callRequiredRouteResolver } from './resolvers';


const Router = new VueRouter( {
  mode: 'history',
  routes,
} );

Router.beforeResolve( callRequiredRouteResolver );

export default Router;
