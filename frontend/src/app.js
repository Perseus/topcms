
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



import Vue from 'vue';
import Router from './router/index';
import VueRouter from 'vue-router';
import store from './store/index';
import * as Sentry from '@sentry/browser'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faCaretDown, faCaretUp, faSignOutAlt, faUser  } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const APP_URL = 'http://localhost:8000';
 
library.add( [ faSearch, faNewspaper, faCaretDown, faSignOutAlt, faUser, faCaretUp ] );
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.devtools = true

// inject VueRouter into Vue
Vue.use(VueRouter);



// Sentry.init({
//     dsn: 'https://b1bb5f392e7d493d901ed3f0397f42c4@sentry.io/1340165',
//     integrations: [new Sentry.Integrations.Vue({ Vue })]
// });

  
// create new Vue app
const app = new Vue({
    store: store,
    router: Router
}).$mount('#app');

