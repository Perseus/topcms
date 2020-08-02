import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';

import AppBootstrapper from './containers/AppBootstrapper.vue';
import router from './router/router';
import store from './store/store';
import RouterSubscriber from './store/plugins/routerPlugin';
import './services/Validations';

import { apolloProvider } from './apollo';
import './assets/_main.scss';
import 'buefy/dist/buefy.min.css';

Vue.component( 'ValidationObserver', ValidationObserver );

RouterSubscriber( router, store );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  apolloProvider,
  render: h => h( AppBootstrapper ),
} ).$mount( '#app' );
