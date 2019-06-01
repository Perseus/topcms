import Vue from 'vue';
import Router from './router/index';
import VueRouter from 'vue-router';
import store from './store/index';
import * as Sentry from '@sentry/browser'
import { mapState } from 'vuex';
import { apolloProvider } from './apollo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faCaretDown, faCaretUp, faSignOutAlt, faUser, faExclamationCircle, faUsers, faGamepad, faMedal, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppBootstrapper from './containers/AppBootstrapper.vue';
import ClickOutside from './directives/ClickOutside';

library.add( [ faSearch, faNewspaper, faCaretDown, faSignOutAlt, faUser, faCaretUp, faExclamationCircle, faUsers, faGamepad, faMedal, faEdit, faTrashAlt ] );

Vue.component( 'font-awesome-icon', FontAwesomeIcon )

Vue.config.devtools = true

// inject VueRouter into Vue
Vue.use( VueRouter );
Vue.use( ClickOutside );

// Sentry.init({
//     dsn: 'https://b1bb5f392e7d493d901ed3f0397f42c4@sentry.io/1340165',
//     integrations: [new Sentry.Integrations.Vue({ Vue })]
// });


// create new Vue app
const app = new Vue( {
  store: store,
  router: Router,
  apolloProvider,
  render: ( h ) => h( AppBootstrapper )
} ).$mount( '#app' );
