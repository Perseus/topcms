import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import VueFroala from 'vue-froala-wysiwyg';

import AppBootstrapper from './containers/AppBootstrapper.vue';
import router from './router/router';
import store from './store/store';
import RouterSubscriber from './store/plugins/routerPlugin';

import { apolloProvider } from './apollo';
import './assets/_main.scss';
import 'buefy/dist/buefy.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

Vue.use( VeeValidate );
Vue.use( VueFroala );
Vue.use( Buefy, {
  defaultIconPack: 'fas',
} );
RouterSubscriber( router, store );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  apolloProvider,
  render: h => h( AppBootstrapper ),
} ).$mount( '#app' );
