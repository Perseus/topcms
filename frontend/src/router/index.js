/** 
 * Routes
 */
import VueRouter from 'vue-router';
import Index from '../containers/Index/Index.vue';
import Root from '../containers/Root/Root.vue';

const routes = [
  { 
    path: '',
    name: 'root',
    component: Root,
    children: [
      {
        path: '/', 
        component: Index,
      }
    ]
  },
]
const Router = new VueRouter({
  routes
});

export default Router;