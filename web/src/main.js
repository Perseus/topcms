import Vue from 'vue';
import Buefy from 'buefy';
import VueFroala from 'vue-froala-wysiwyg';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { ValidationObserver } from 'vee-validate';

import AppBootstrapper from './containers/AppBootstrapper.vue';
import router from './router/router';
import store from './store/store';
import RouterSubscriber from './store/plugins/routerPlugin';
import './services/Validations';

import { apolloProvider } from './apollo';
import './assets/_main.scss';
import 'buefy/dist/buefy.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

Vue.use( VueFroala );
Vue.use( Buefy, {
  defaultIconPack: 'fas',
} );
Vue.component( 'ValidationObserver', ValidationObserver );

RouterSubscriber( router, store );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  apolloProvider,
  render: h => h( AppBootstrapper ),
} ).$mount( '#app' );
