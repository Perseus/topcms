import Vue from 'vue';
import Router from './router/index';
import VueRouter from 'vue-router';
import store from './store/index';
import * as Sentry from '@sentry/browser'
import { mapState } from 'vuex';
import { apolloProvider } from './apollo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faCaretDown, faCaretUp, faSignOutAlt, faUser, faExclamationCircle, faUsers, faGamepad, faMedal } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add( [ faSearch, faNewspaper, faCaretDown, faSignOutAlt, faUser, faCaretUp, faExclamationCircle, faUsers, faGamepad, faMedal ] );

Vue.component( 'font-awesome-icon', FontAwesomeIcon )

Vue.config.devtools = true

// inject VueRouter into Vue
Vue.use( VueRouter );

Vue.directive( 'click-outside', {
  bind: function( el, binding, vnode ) {
    el.clickOutsideEvent = function( event ) {
      // here I check that click was outside the el and his childrens
      if ( !( el == event.target || el.contains( event.target ) ) ) {
        // and if it did, call method provided in attribute value
        vnode.context[ binding.expression ]( event );
      }
    };
    document.body.addEventListener( 'click', el.clickOutsideEvent )
  },
  unbind: function( el ) {
    document.body.removeEventListener( 'click', el.clickOutsideEvent )
  },
} );

// Sentry.init({
//     dsn: 'https://b1bb5f392e7d493d901ed3f0397f42c4@sentry.io/1340165',
//     integrations: [new Sentry.Integrations.Vue({ Vue })]
// });


// create new Vue app
const app = new Vue( {
  computed: {
    ...mapState( {
      isLoading: state => state.application.isApplicationLoading
    } ),
  },
  store: store,
  router: Router,
  apolloProvider,
  template: `
    <div v-if="isLoading" class="app-loading">
      <div class="loader"></div>
      Loading
    </div>
    <router-view v-else></router-view>`,
} ).$mount( '#app' );
