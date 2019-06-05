import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';

import AppBootstrapper from './containers/AppBootstrapper.vue';
import router from './router/router';
import store from './store/store';
import { apolloProvider } from './apollo';
import './assets/_main.scss';
import 'buefy/dist/buefy.css';

Vue.use( VeeValidate );
Vue.use( Buefy, {
  defaultIconPack: 'fas',
} );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  apolloProvider,
  render: h => h( AppBootstrapper ),
} ).$mount( '#app' );
